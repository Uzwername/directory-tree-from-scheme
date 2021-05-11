import path from "path";
import {
  combinedForcedTypesRegExp,
  depthDelimiter,
  splitSchemeToCleanLines,
} from "./parse-scheme-to-directory-tree-utils";
import { ForceTypeFlags, ParseSchemeToDirectoryTree, DirentDescription, Scope } from "./parse-scheme-to-directory-tree.types";

const parseSchemeToDirectoryTree: ParseSchemeToDirectoryTree = rawScheme => {
  if (!rawScheme || typeof rawScheme !== "string") {
    return [];
  }
  
  const rawOperationLines: string[] = splitSchemeToCleanLines(rawScheme);
  
  const operations: DirentDescription[] = [];
  let scopesStack: Scope[] = [{
    depth: -1,
    relativePath: "",
    parentRef: operations,
  }];
  const getTopScope = () => scopesStack[scopesStack.length - 1];
  
  for (const rawOperationLine of rawOperationLines) {
    let entryName: string;
    
    // Find out current line depth specified by the user via something like "--|"
    const maybeDepthDelimiterIndex = rawOperationLine.search(depthDelimiter.pattern);
    const isDepthDelimiterPresent = maybeDepthDelimiterIndex > -1;
    let depthIndicator: string;
    if (isDepthDelimiterPresent) {
      depthIndicator = rawOperationLine.slice(0, maybeDepthDelimiterIndex).replace(/\s/g, "");
      entryName = rawOperationLine.slice(maybeDepthDelimiterIndex + depthDelimiter.length);
    } else {
      depthIndicator = "";
      entryName = rawOperationLine;
    }
    const depth = depthIndicator.length
    
    // Find out whether entry type is forced or calculate entry type otherwise
    const maybeForcedTypeSearchResults = rawOperationLine.match(combinedForcedTypesRegExp);
    const isEntryTypeForced = maybeForcedTypeSearchResults !== null;
    let forcedEntryType: string | undefined;
    let entryType: ForceTypeFlags;
    if (isEntryTypeForced) {
      const forcedTypeSearchResults = maybeForcedTypeSearchResults as RegExpMatchArray;
      forcedEntryType = forcedTypeSearchResults[0];
      // File name without forced type
      entryName = entryName.slice(0, -forcedEntryType.length);
      // Capturing group content
      entryType = forcedTypeSearchResults[1] as ForceTypeFlags;
    } else {
      // By default type is "file" if it has one or more dots in its name &
      // there's at least 1 character after the last dot.
      entryType = path.extname(rawOperationLine).length > 1 ? "file" : "dir";
    }
    
    const parsedDirent: DirentDescription = {
      name: entryName,
      type: entryType,
      relativePath: "", // Declare prop here & overwrite it later
      children: [],
    };
    
    // Verifies that entry is placed at correct depth or skip it
    if (depth - getTopScope().depth > 1) {
      continue;
    }
    
    // Leave only those scopes that are less nested than the current scope to avoid writing to a stale scope
    scopesStack = scopesStack.filter(({ depth: stackDepth }) => depth > stackDepth);
    
    // Ignore entries with duplicate name
    if (getTopScope().parentRef.find(({name: existingEntryName}) => existingEntryName === entryName)) {
      continue;
    }

    parsedDirent.relativePath = path.join(getTopScope().relativePath, entryName);
    getTopScope().parentRef.push(parsedDirent);
    
    // Let's add current dir as topmost scope since it can contain some content 
    if (entryType === "dir") {
      scopesStack.push({
        depth,
        relativePath: parsedDirent.relativePath,
        parentRef: parsedDirent.children,
      })
    }
  }
  return scopesStack[0].parentRef;
};

export default parseSchemeToDirectoryTree;
