import path from "path";
import { constants as fsConstants } from "fs";
import fs from "fs/promises";
import mkdirTree from "./mkdir-tree";

const isEntryExists = async path => {
  try {
    await fs.access(path, fsConstants.W_OK | fsConstants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
};

describe(mkdirTree.name, () => {
  const testBasePath = path.join(process.cwd(), mkdirTree.name.concat("_test_dir"));
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
  
  it("Has the desired shape", async () => {
    expect(typeof mkdirTree).toBe("function");
    expect(mkdirTree.length).toBe(2);
    // Throws if first argument is missing
    expect(() => mkdirTree()).toThrow("Directory path must be a string, passed path's type was undefined.");
    // Throws if first argument is invalid
    expect(() => mkdirTree([])).toThrow("Directory path must be a string, passed path's type was object.");
    // Throws if first argument is an empty string
    expect(() => mkdirTree("")).toThrow("Empty string cannot be used as a directory path.");
    // Throws if second argument is missing
    expect(() => mkdirTree(".")).toThrow("Scheme must be a string, passed scheme's type was undefined.");
    // Throws if second argument is invalid
    expect(() => mkdirTree(".", {})).toThrow("Scheme must be a string, passed scheme's type was object.");
    // Synchronously Returns empty array if an empty scheme is provided
    const emptyArray = mkdirTree(".", "");
    expect(Array.isArray(emptyArray)).toBe(true);
    expect(emptyArray.length).toBe(0);
  });
  
  // Re-create this project to ensure it actually works
  it("Works", async () => {
    const result = await mkdirTree(
      testBasePath,
      `
        ${nestedStructureRootName}
        - | dist
        - | node_modules
        - | src
        - - | index.ts
        - - | mkdir-tree
        - - - | mkdir-tree-utils.test.js
        - - - | mkdir-tree-utils.ts
        - - - | mkdir-tree.ts
        - - - | mkdir-tree.types.ts
        - - | parse-scheme-to-directory-tree
        - - - | parse-scheme-to-directory-tree-utils.ts
        - - - | parse-scheme-to-directory-tree.test.js
        - - - | parse-scheme-to-directory-tree.ts
        - - - | parse-scheme-to-directory-tree.types.ts
        - | .browserslistrc
        - | .eslintrc.js
        - | .gitignore
        - | babel.config.js
        - | jest.config.js
        - | package.json
        - | package-lock.json
        - | tsconfig.json
        - | webpack.common.js
        - | webpack.dev.js
        - | webpack.prod.js
      `,
    );
    
    expect(result.filter(info => info.status === "success").length).toBe(result.length);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "package.json")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "jest.config.js")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "src/mkdir-tree/mkdir-tree.ts")
      )
    ).toBe(true);
    
    expect(
      await isEntryExists(
        path.join(nestedStructureRootPath, "src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.ts")
      )
    ).toBe(true);
  });
  
  it("Works if target dir doesn't exist", async () => {
    const result = await mkdirTree(
      path.join(testBasePath, "non/existent/dir"),
      `
        some
        test
        folders
      `,
    );
    
    result.forEach(info => {
      expect(info.status).toBe("error");
      expect(info.error.code).toBe("ENOENT");
      expect(info.error.message).toContain("no such file or directory");
    });
    
  });
}); 