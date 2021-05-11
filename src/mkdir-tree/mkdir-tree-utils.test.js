import path from "path";
import { constants as fsConstants } from "fs";
import fs from "fs/promises";
import parseSchemeToDirectoryTree from "../parse-scheme-to-directory-tree/parse-scheme-to-directory-tree";
import { buildDirectoryTreeLayers } from "./mkdir-tree-utils";

const isEntryExists = async path => {
  try {
    await fs.access(path, fsConstants.W_OK | fsConstants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
};

describe(buildDirectoryTreeLayers.name, () => {
  const testBasePath = path.join(process.cwd(), buildDirectoryTreeLayers.name.concat("_test_dir"));
  const nestedStructureRootName = "root";
  const nestedStructureRootPath = path.join(testBasePath, nestedStructureRootName);
  
  // Set-up temporarily test dir
  beforeAll(async () => {
    await fs.mkdir(testBasePath);
  });
  
  // Clean temporarily test dir 
  afterAll(async () => {
    await fs.rm(testBasePath, { recursive: true });
  });
  
  // Clean-up root folder & its content if it was set-up by a test
  afterEach(async () => {
    try {
      await fs.rm(nestedStructureRootPath, { recursive: true });
    } catch (error) {
      if (error?.code === "ENOENT") {
        return;
      }
      
      throw error;
    }
  });
  
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
    const parsedScheme = parseSchemeToDirectoryTree(nestedStructureRootName);
    
    expect(
      await buildDirectoryTreeLayers(
        testBasePath,
        parsedScheme,
      )
    ).toStrictEqual([{
      path: nestedStructureRootPath,
      status: "success",
      dirent: parsedScheme[0],
    }]);
  });
  
  it("Creates a nested structure", async () => {
    const result = await buildDirectoryTreeLayers(
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
    );
    
    // All operation must succeed to check further
    expect(result.filter(info => info.status === "success").length).toBe(result.length);
    
    // Check 2nd level empty dir  
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 3")
      )
    ).toBe(true);
    
    // Check the deepest entries
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 1/downloads/movies/james_bond.mp4")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 2/.git")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 1/photos/MOV_12231.jpeg")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 1/photos/MOV_81721.jpeg")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "level 1/scans/scan_0001.pdf")
      )
    ).toBe(true);
  });
  
  it("Can complete partially created directory tree structures", async () => {
    // Create a part of directory structure
    const partialStructureResult = await buildDirectoryTreeLayers(
      testBasePath,
      parseSchemeToDirectoryTree(`
        ${nestedStructureRootName}
        - | tests
        - - | e2e
        - | node_modules
        - - | jest
        - - - | jest.js
      `)
    );
    
    expect(partialStructureResult.filter(info => info.status === "success").length).toBe(partialStructureResult.length);
    
    const testFileContent = `
      import * as jest from "./somewhere/else";
      
      export default jest;
    `;
    
    const testFilePath = path.join(nestedStructureRootPath, "node_modules/jest/jest.js");
    
    await fs.writeFile(testFilePath, testFileContent);
    
    // Create missing parts of directory structure
    const result = await buildDirectoryTreeLayers(
      testBasePath,
      parseSchemeToDirectoryTree(`
        ${nestedStructureRootName}
        - | dist
        - | jest.config.js
        - | tests
        - - | e2e
        - - - | cypress.config.js
        - - | fragment
        - - | unit
        - - - | index.js
        - | node_modules
        - - | jest
        - - - | jest.d.js
        - - - | jest.js
        - - - | jest.ts
      `)
    );
    
    // If entries are already created, the `status` will be success since the presence of these
    // entries allows the process to continue without any problem (identically as if those entries
    // were successfully created by the current process).
    expect(result.filter(info => info.status === "success").length).toBe(result.length);

    // New entries are created
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "dist")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "jest.config.js")
      )
    ).toBe(true);
    
    // New file is created inside an existing folder
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "tests/e2e/cypress.config.js")
      )
    ).toBe(true);
    
    // A new folder is created inside an existing folder
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "tests/fragment")
      )
    ).toBe(true);
    
    // New file is created in new folder
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "tests/unit/index.js")
      )
    ).toBe(true);
    
    // Existing file is untouched
    expect(
      await fs.readFile(
        testFilePath,
        { encoding: "utf8" },
      )
    ).toBe(testFileContent);
    
    // New files are created in an existing directory that already contained a file
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "node_modules/jest/jest.ts")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "node_modules/jest/jest.d.js")
      )
    ).toBe(true);
    
  });
  
  it("Skips tree sections on folder creation error", async () => {
    const result = await buildDirectoryTreeLayers(
      testBasePath,
      parseSchemeToDirectoryTree(`
        ${nestedStructureRootName}
        - | invalid/folder/name
        - - | skippedDir
        - - | skippedFile
        - | valid-dir
        - - | archive.gzip
      `)
    );
    
    expect(result.length).toBe(3 + [nestedStructureRootName].length);
    
    const failedOperations = result.filter(info => info.status === "error");
    const successfulOperations = result.filter(info => info.status === "success");
    expect(failedOperations.length).toBe(1);
    expect(successfulOperations.length).toBe(2 + [nestedStructureRootName].length);
    expect(failedOperations[0].dirent.name).toBe("invalid/folder/name");
    expect(successfulOperations[0].dirent.name).toBe(nestedStructureRootName);
    expect(successfulOperations.find(info => info.dirent.name) === "valid-dir").toBeDefined();
    expect(successfulOperations.find(info => info.dirent.name) === "archive.gzip").toBeDefined();
  });
  
  it("Does not perform any name procession", async () => {
    const result = await buildDirectoryTreeLayers(
      testBasePath,
      parseSchemeToDirectoryTree(`
        ${nestedStructureRootName}
        - | \0
        - | invalid\x00 /file
        - | several/levels/in/a/single/name
      `)
    );
    
    expect(result.length).toBe(3 + [nestedStructureRootName].length);
    
    const operationsWithErrorStatus = result.slice(1).filter(info => info.status === "error");
    expect(operationsWithErrorStatus.length).toBe(3);
    // Errors are reported properly
    operationsWithErrorStatus.forEach(info => {
      // For some reason, toBeInstanceOf matcher will not work with `NodeError`s
      expect(info.error.toString()).toContain("Error");
    });
    expect(
      (await fs.readdir(nestedStructureRootPath)).length
    ).toBe(0);
  });
  
  // This must be important for performance
  it("Process directory tree per vertical slices", async () => {
    const result = await buildDirectoryTreeLayers(
      testBasePath,
      parseSchemeToDirectoryTree(`
        ${nestedStructureRootName}
        - | dir-1-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-2-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-3-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-4-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-5-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-6-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-7-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-8-level-1
        - - | level-2
        - - - | last_level.php
        - | dir-9-level-1
        - - | level-2
        - - - | last_level.php
      `),
    );
    
    expect(result.filter(info => info.status === "success").length).toBe(result.length);
    expect(result.length).toBe(9 * 3 + [nestedStructureRootName].length);
    
    expect(result[0].path).toBe(nestedStructureRootPath);
    const resultsExceptRootNode = result.slice(1);
    expect(
      resultsExceptRootNode.slice(0, 9).map(info => info.dirent.name)
    ).toStrictEqual(
      Array(9).fill().map((_, i) => `dir-${i + 1}-level-1`)
    );
    
    expect(
      resultsExceptRootNode.slice(9, 18).map(info => info.dirent.name)
    ).toStrictEqual(
      Array(9).fill("level-2")
    );
    
    expect(
      resultsExceptRootNode.slice(18, 27).map(info => info.dirent.name)
    ).toStrictEqual(
      Array(9).fill("last_level.php")
    );
  });
});