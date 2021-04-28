import path from "path";
import {
  combinedForcedTypesRegex,
  depthDelimiterSign,
  splitSchemeToCleanLines,
} from "./parse-scheme-to-operations-utils";
import { ForceTypeFlags, ParseSchemeToOperations, Operation, Scope } from "./parse-scheme-to-operations.types";

const parseSchemeToOperations: ParseSchemeToOperations = rawScheme => {
  if (!rawScheme || typeof rawScheme !== "string") {
    return [];
  }
  
  const rawOperationLines: string[] = splitSchemeToCleanLines(rawScheme);
  
  let operations: Operation[] = [];
  let scopesStack: Scope[] = [{
    depth: -1,
    parentRef: operations,
  }];
  const getTopmostScope = () => scopesStack[scopesStack.length - 1];
  
  for (const rawOperationLine of rawOperationLines) {
    let entryName: string;
    
    // Find out current line depth specified by the user via something like "--|"
    const maybeDepthDelimiterIndex = rawOperationLine.indexOf(depthDelimiterSign);
    const isDepthDelimiterPresent = maybeDepthDelimiterIndex > -1;
    let depthIndicator: string;
    if (isDepthDelimiterPresent) {
      depthIndicator = rawOperationLine.slice(0, maybeDepthDelimiterIndex).replace(/\s/g, "");
      entryName = rawOperationLine.slice(maybeDepthDelimiterIndex + depthDelimiterSign.length);
    } else {
      depthIndicator = "";
      entryName = rawOperationLine;
    }
    const depth = depthIndicator.length
    
    // Find out whether entry type is forced or calculate entry type otherwise
    const maybeForcedTypeSearchResults = rawOperationLine.match(combinedForcedTypesRegex);
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
      entryName = entryName;
      // By default type is "file" if it has one or more dots in its name &
      // there's at least 1 character after the last dot.
      entryType = path.parse(rawOperationLine).ext.length > 1 ? "file" : "dir";
    }
    
    let parsedOperation: Operation = {
      name: entryName,
      type: entryType,
      children: [],
    };
    
    // Verifies that entry is placed at correct depth or skip it
    if (depth - getTopmostScope().depth > 1) {
      continue;
    }
    
    // Leave only those scopes that are less nested than the current scope to avoid writing to a stale scope
    scopesStack = scopesStack.filter(({ depth: stackDepth }) => depth > stackDepth);
    
    // Ignore entries with duplicate name
    if (getTopmostScope().parentRef.find(({name: existingEntryName}) => existingEntryName === entryName)) {
      continue;
    }
    
    getTopmostScope().parentRef.push(parsedOperation);
    
    // Let's add current dir as topmost scope since it can contain some content 
    if (entryType === "dir") {
      scopesStack.push({
        depth,
        parentRef: parsedOperation.children,
      })
    }
  }
  return scopesStack[0].parentRef;
};

export default parseSchemeToOperations;
