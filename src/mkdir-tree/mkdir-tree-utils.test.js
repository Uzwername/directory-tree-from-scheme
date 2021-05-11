import path from "path";
import fs from "fs/promises";
import parseSchemeToDirectoryTree from "../parse-scheme-to-directory-tree/parse-scheme-to-directory-tree";
import { buildDirectoryTreeLayers } from "./mkdir-tree-utils";

describe(buildDirectoryTreeLayers.name, () => {
  const testBasePath = path.join(process.cwd(), "__tests__");
  
  it("Has the desired shape", () => {
    expect(typeof buildDirectoryTreeLayers).toBe("function");
    expect(buildDirectoryTreeLayers.length).toBe(2);
  });
  
  it("Ignores an empty input", async () => {
    expect(
      await buildDirectoryTreeLayers(
        testBasePath,
        [],
      )
    ).toStrictEqual([]);
  });
  
  it("Creates a single entry", async () => {
    const singleEntryName = "directory";
    const parsedScheme = parseSchemeToDirectoryTree(singleEntryName);
    const singleEntryPath = path.join(testBasePath, singleEntryName);
    
    expect(
      await buildDirectoryTreeLayers(
        testBasePath,
        parsedScheme,
      )
    ).toStrictEqual([{
      path: path.join(process.cwd(), "__tests__", singleEntryName),
      status: "success",
      dirent: parsedScheme[0],
    }]);
    
    await fs.rmdir(singleEntryPath);
  });
  
  it("Creates a nested structure", async () => {
    const nestedStructureRootName = "root";
    const nestedStructureRootPath = path.join(testBasePath, nestedStructureRootName);
    
    expect(
      typeof await buildDirectoryTreeLayers(
        testBasePath,
        parseSchemeToDirectoryTree(`
          ${nestedStructureRootName}
            - | level 1
            - - | notes.docx
            - - | downloads
            - - - | movies
            - - - - | james_bond.mp4
            - - | photos
            - - - | MOV_12231.jpeg
            - - - | MOV_81721.jpeg
            - - | scans
            - - - | scan_0001.pdf
            - - | documents
            - | level 2
            - - | .git
            - | level 3
        `)
      )
    ).toBe("object");
    
    await fs.rm(nestedStructureRootPath, { recursive: true });
  });
  
  it("Can complete partially created file structures", async () => {
    
  });
  
  it("Skips tree sections on folder creation error", async () => {
    
  });
  
  it("Process directory tree per vertical slices", () => {
    
  });
});