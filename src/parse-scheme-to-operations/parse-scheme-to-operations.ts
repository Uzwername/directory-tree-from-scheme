import path from "path";
import { ForceTypeFlags, ParseSchemeToOperations, Operation } from "./parse-scheme-to-operations.types";
const supportedForcedTypes: ForceTypeFlags[] = ["file", "dir"];
const combinedForcedTypesRegex = new RegExp(`\\s\\/(${supportedForcedTypes.join("|")})$`);

const parseSchemeToOperations: ParseSchemeToOperations = rawScheme => {
  if (!rawScheme || typeof rawScheme !== "string") {
    return [];
  }
  
  const rawOperationLines: string[] = rawScheme
    .split("\n")
    .reduce((accumulator: string[], string) => {
      const denseString = string.trim().replace(/\r/gm, "");
      
      return denseString ? accumulator.concat(denseString) : accumulator; 
    }, []);
  
  let operations: Operation[] = [];
  for (const rawOperationLine of rawOperationLines) {
    const maybeForcedTypeSearchResults = rawOperationLine.match(combinedForcedTypesRegex);
    const isTypeForced = Boolean(maybeForcedTypeSearchResults);
    
    let forcedType: string | undefined;
    let name: string;
    let type: ForceTypeFlags;
    if (isTypeForced) {
      const forcedTypeSearchResults = maybeForcedTypeSearchResults as RegExpMatchArray;
      forcedType = forcedTypeSearchResults[0];
      // File name without forced type
      name = rawOperationLine.slice(0, -forcedType.length);
      // Capturing group content
      type = forcedTypeSearchResults[1] as ForceTypeFlags;
    } else {
      name = rawOperationLine;
      // By default type is "file" if it seems like it has an extension
      type = path.parse(rawOperationLine).ext.length > 0 ? "file" : "dir";
    }
    
    operations.push({
      name,
      type,
      children: [],
    });
  }
    
  return operations;
};

export default parseSchemeToOperations;