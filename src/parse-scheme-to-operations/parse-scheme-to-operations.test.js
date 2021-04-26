import { expect, it } from "@jest/globals";
import parseSchemeToOperations from "./parse-scheme-to-operations";

describe(`${parseSchemeToOperations.name}: Valid inputs`, () => {
  it("Has the desired shape", () => {
    expect(typeof parseSchemeToOperations).toBe("function");
    expect(parseSchemeToOperations.length).toBe(1);
    expect(Array.isArray(parseSchemeToOperations())).toBe(true)
  });
  
  it("Accepts single-line scheme", () => {
    expect(parseSchemeToOperations("downloads")).toStrictEqual([{
      name: "downloads",
      type: "dir",
      children: [],
    }]);
  });
  
  it("Parses a simple flat scheme", () => {
    const testScheme = [
      "\n",
      " dirs1",
      "dir2     ",
      "dir3",
      "\n",
    ].join("\r\n");
    
    const expectedResult = [
      {
        name: "dirs1",
        type: "dir",
        children: [],
      },
      {
        name: "dir2",
        type: "dir",
        children: [],
      },
      {
        name: "dir3",
        type: "dir",
        children: [],
      },
    ];
    
    expect(parseSchemeToOperations(testScheme)).toStrictEqual(expectedResult);
  });
  
  it("Auto-detects whether an entry is file or directory", () => {
    const testScheme = `
      movies
      links.docx
    `;
    
    const expectedResult = [
      {
        name: "movies",
        type: "dir",
        children: [],
      },
      {
        name: "links.docx",
        type: "file",
        children: [],
      },
    ];
    
    expect(parseSchemeToOperations(testScheme)).toStrictEqual(expectedResult);
  });
  
  it("Allows to force type", () => {
    const testScheme = `
      movies /file
      links.docx /dir
    `;
    
    const expectedResult = [
      {
        name: "movies",
        type: "file",
        children: [],
      },
      {
        name: "links.docx",
        type: "dir",
        children: [],
      },
    ];
    
    expect(parseSchemeToOperations(testScheme)).toStrictEqual(expectedResult);
  });
  
  it("Allows to force type to the same type that would be auto-detected", () => {
    const testScheme = `
      movies \/dir
      links.docx \/file
    `;
    
    const expectedResult = [
      {
        name: "movies",
        type: "dir",
        children: [],
      },
      {
        name: "links.docx",
        type: "file",
        children: [],
      },
    ];
    
    expect(parseSchemeToOperations(testScheme)).toStrictEqual(expectedResult);
  });
});

describe(`${parseSchemeToOperations.name}: Valid inputs`, () => {
  it("Returns empty array for empty or obviously invalid input", () => {
    expect(parseSchemeToOperations(Symbol())).toStrictEqual([]);
    expect(parseSchemeToOperations(() => "hey")).toStrictEqual([]);
    expect(parseSchemeToOperations("")).toStrictEqual([]);
    expect(parseSchemeToOperations(`
    `)).toStrictEqual([]);
    expect(parseSchemeToOperations(`
    
    
    
    `)).toStrictEqual([]);
    /**
     * @TODO 
     * Test invalid nesting here
     */
  });
  
  it("Ignores invalid force type flags", () => {
    expect(parseSchemeToOperations(`
      sample /files
    `)).toStrictEqual([{
      name: "sample /files",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample /dirs
    `)).toStrictEqual([{
      name: "sample /dirs",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample /file      k
    `)).toStrictEqual([{
      name: "sample /file      k",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample /dir _9
    `)).toStrictEqual([{
      name: "sample /dir _9",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample //file
    `)).toStrictEqual([{
      name: "sample //file",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample //dir
    `)).toStrictEqual([{
      name: "sample //dir",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample \\/file
    `)).toStrictEqual([{
      name: "sample \\/file",
      type: "dir",
      children: [],
    }]);
    
    expect(parseSchemeToOperations(`
      sample \\/dir
    `)).toStrictEqual([{
      name: "sample \\/dir",
      type: "dir",
      children: [],
    }]);
  });
});