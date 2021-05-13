import os from "os";
import { ForceTypeFlags } from "@/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.types";

const supportedForcedTypes: ForceTypeFlags[] = ["file", "dir"];
export const combinedForcedTypesRegExp = new RegExp(`\\s\\/(${supportedForcedTypes.join("|")})$`);
export const depthDelimiter = Object.freeze({
  pattern: /\|\s/,
  length: 2,
});

export const splitSchemeToCleanLines = (scheme: string): string[] => scheme
  .split(os.EOL)
  .reduce((accumulator: string[], string) => {
    const denseString = string.trim();
    
    return denseString ? accumulator.concat(denseString) : accumulator; 
  }, []);