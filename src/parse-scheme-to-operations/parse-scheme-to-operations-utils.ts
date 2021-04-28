const supportedForcedTypes: ForceTypeFlags[] = ["file", "dir"];
export const combinedForcedTypesRegex = new RegExp(`\\s\\/(${supportedForcedTypes.join("|")})$`);
export const depthDelimiterSign = "| ";

export const splitSchemeToCleanLines = (scheme: string): string[] => scheme
  .split("\n")
  .reduce((accumulator: string[], string) => {
    const denseString = string.trim();
    
    return denseString ? accumulator.concat(denseString) : accumulator; 
  }, []);