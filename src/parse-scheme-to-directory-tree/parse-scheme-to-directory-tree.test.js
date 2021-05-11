import path from "path";
import parseSchemeToDirectoryTree from "./parse-scheme-to-directory-tree";

describe(`${parseSchemeToDirectoryTree.name}: Valid inputs`, () => {
  it("Has the desired shape", () => {
    expect(typeof parseSchemeToDirectoryTree).toBe("function");
    expect(parseSchemeToDirectoryTree.length).toBe(1);
    expect(Array.isArray(parseSchemeToDirectoryTree())).toBe(true)
  });
  
  it("Accepts single-line scheme", () => {
    expect(parseSchemeToDirectoryTree("downloads")).toStrictEqual([{
      name: "downloads",
      type: "dir",
      relativePath: path.normalize("downloads"),
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
    ];
    
    const expectedResult = [
      {
        name: testScheme[1].trim(),
        type: "dir",
        relativePath: path.normalize("dirs1"),
        children: [],
      },
      {
        name: testScheme[2].trim(),
        type: "dir",
        relativePath: path.normalize("dir2"),
        children: [],
      },
      {
        name: testScheme[3].trim(),
        type: "dir",
        relativePath: path.normalize("dir3"),
        children: [],
      },
    ];
    
    expect(parseSchemeToDirectoryTree(testScheme.join("\r\n"))).toStrictEqual(expectedResult);
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
        relativePath: path.normalize("movies"),
        children: [],
      },
      {
        name: "links.docx",
        type: "file",
        relativePath: path.normalize("links.docx"),
        children: [],
      },
    ];
    
    expect(parseSchemeToDirectoryTree(testScheme)).toStrictEqual(expectedResult);
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
        relativePath: path.normalize("movies"),
        children: [],
      },
      {
        name: "links.docx",
        type: "dir",
        relativePath: path.normalize("links.docx"),
        children: [],
      },
    ];
    
    expect(parseSchemeToDirectoryTree(testScheme)).toStrictEqual(expectedResult);
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
        relativePath: path.normalize("movies"),
        children: [],
      },
      {
        name: "links.docx",
        type: "file",
        relativePath: path.normalize("links.docx"),
        children: [],
      },
    ];
    
    expect(parseSchemeToDirectoryTree(testScheme)).toStrictEqual(expectedResult);
  });
  
  it("Parses nested children structures", () => {
    expect(parseSchemeToDirectoryTree(`
      notes
      -| books.txt
      -| important
      --| accounts
      ---| account-ids.xlsx
      -| resources.pages
      movies
    `)).toStrictEqual([
      {
        name: "notes",
        type: "dir",
        relativePath: path.normalize("notes"),
        children: [
          {
            name: "books.txt",
            type: "file",
            relativePath: path.normalize("notes/books.txt"),
            children: [],
          },
          {
            name: "important",
            type: "dir",
            relativePath: path.normalize("notes/important"),
            children: [{
              name: "accounts",
              type: "dir",
              relativePath: path.normalize("notes/important/accounts"),
              children: [{
                name: "account-ids.xlsx",
                type: "file",
                relativePath: path.normalize("notes/important/accounts/account-ids.xlsx"),
                children: [],
              }]
            }],
          },
          {
            name: "resources.pages",
            type: "file",
            relativePath: path.normalize("notes/resources.pages"),
            children: [],
          },
        ],
      },
      {
        name: "movies",
        type: "dir",
        relativePath: path.normalize("movies"),
        children: [],
      },
    ]);
  });
  
  it("Parses nested children structure with repeating filenames in different scopes", () => {
    expect(parseSchemeToDirectoryTree(`
      src
        -| index.html
      dist
        -| index.html
      mocks
        -| index.html
    `)).toStrictEqual([
      {
        name: "src",
        type: "dir",
        relativePath: path.normalize("src"),
        children: [{
          name: "index.html",
          type: "file",
          relativePath: path.normalize("src/index.html"),
          children: [],
        }],
      },
      {
        name: "dist",
        type: "dir",
        relativePath: path.normalize("dist"),
        children: [{
          name: "index.html",
          type: "file",
          relativePath: path.normalize("dist/index.html"),
          children: [],
        }],
      },
      {
        name: "mocks",
        type: "dir",
        relativePath: path.normalize("mocks"),
        children: [{
          name: "index.html",
          type: "file",
          relativePath: path.normalize("mocks/index.html"),
          children: [],
        }],
      },
    ]);
  });
  
  it("Creates scopes on dirs automatically", () => {
    expect(parseSchemeToDirectoryTree(`
      .git
        -| refs
    `)).toStrictEqual([{
      name: ".git",
      type: "dir",
      relativePath: path.normalize(".git"),
      children: [{
        name: "refs",
        type: "dir",
        relativePath: path.normalize(".git/refs"),
        children: [],
      }],
    }]);
    
    // Forced directories create scopes
    expect(parseSchemeToDirectoryTree(`
      file.txt /dir 
        - | settings.xml
    `)).toStrictEqual([{
      name: "file.txt",
      type: "dir",
      relativePath: path.normalize("file.txt"),
      children: [{
        name: "settings.xml",
        type: "file",
        relativePath: path.normalize("file.txt/settings.xml"),
        children: [],
      }],
    }]);
  });
  
  it("Parses valid nested structures correctly", () => {
    expect(parseSchemeToDirectoryTree(`
      dir1
      dir2
      -| dir3
      --| dir4 
      -| file.txt
    `)).toStrictEqual([
      {
        name: "dir1",
        type: "dir",
        relativePath: path.normalize("dir1"),
        children: [],
      },
      {
        name: "dir2",
        type: "dir",
        relativePath: path.normalize("dir2"),
        children: [
          {
            name: "dir3",
            type: "dir",
            relativePath: path.normalize("dir2/dir3"),
            children: [{
              name: "dir4",
              type: "dir",
              relativePath: path.normalize("dir2/dir3/dir4"),
              children: [],
            }],
          },
          {
            name: "file.txt",
            type: "file",
            relativePath: path.normalize("dir2/file.txt"),
            children: [],
          },
        ],
      },
    ]);
    
    expect(parseSchemeToDirectoryTree(`
      dir 1
      dir 2
      - | dir 3
      - - | dir 4
      - - - | dir 5
      - - - -| dir 6
      - - - - - | dir 7
    `)).toStrictEqual([
      {
        name: "dir 1",
        type: "dir",
        relativePath: path.normalize("dir 1"),
        children: [],
      },
      {
        name: "dir 2",
        type: "dir",
        relativePath: path.normalize("dir 2"),
        children: [{
          name: "dir 3",
          type: "dir",
          relativePath: path.normalize("dir 2/dir 3"),
          children: [{
            name: "dir 4",
            type: "dir",
            relativePath: path.normalize("dir 2/dir 3/dir 4"),
            children: [{
              name: "dir 5",
              type: "dir",
              relativePath: path.normalize("dir 2/dir 3/dir 4/dir 5"),
              children: [{
                name: "dir 6",
                type: "dir",
                relativePath: path.normalize("dir 2/dir 3/dir 4/dir 5/dir 6"),
                children: [{
                  name: "dir 7",
                  type: "dir",
                  relativePath: path.normalize("dir 2/dir 3/dir 4/dir 5/dir 6/dir 7"),
                  children: [],
                }],
              }],
            }],
          }],
        }],
      },
    ]);
    
    expect(parseSchemeToDirectoryTree(`
      dir1
      - | dir2
      --| file.txt
      -| DIR3
      - - | Dir4
      ---| dir 5
      ---| file2.txt /dir
      --| dir 6
      - - - | dir 7 /file
      -| file 3.xml
      file4.docx
    `)).toStrictEqual([
      {
        name: "dir1",
        type: "dir",
        relativePath: path.normalize("dir1"),
        children: [
          {
            name: "dir2",
            type: "dir",
            relativePath: path.normalize("dir1/dir2"),
            children: [{
              name: "file.txt",
              type: "file",
              relativePath: path.normalize("dir1/dir2/file.txt"),
              children: [],
            }],
          },
          {
            name: "DIR3",
            type: "dir",
            relativePath: path.normalize("dir1/DIR3"),
            children: [
              {
                name: "Dir4",
                type: "dir",
                relativePath: path.normalize("dir1/DIR3/Dir4"),
                children: [
                  {
                    name: "dir 5",
                    type: "dir",
                    relativePath: path.normalize("dir1/DIR3/Dir4/dir 5"),
                    children: [],
                  },
                  {
                    name: "file2.txt",
                    type: "dir",
                    relativePath: path.normalize("dir1/DIR3/Dir4/file2.txt"),
                    children: [],
                  },
                ],
              },
              {
                name: "dir 6",
                type: "dir",
                relativePath: path.normalize("dir1/DIR3/dir 6"),
                children: [{
                  name: "dir 7",
                  type: "file",
                  relativePath: path.normalize("dir1/DIR3/dir 6/dir 7"),
                  children: [],
                }],
              },
            ],
          },
          {
            name: "file 3.xml",
            type: "file",
            relativePath: path.normalize("dir1/file 3.xml"),
            children: [],
          },
        ],
      },
      {
        name: "file4.docx",
        type: "file",
        relativePath: path.normalize("file4.docx"),
        children: [],
      },
    ]);
  });
  
  it("Climbs up & down", () => {
    expect(parseSchemeToDirectoryTree(`
      dir 1
      -| dir 2
      dir 3
      -| dir 4
      --| dir 5
      ---| dir 6
      ----| dir 7
      -----| dir 8
      ---| dir 9
      --| dir 10
      -| dir 11
      --| dir 12
      ---| dir 13
      --| dir 14
      -| dir 4
      dir 15
    `)).toStrictEqual([
      {
        name: "dir 1",
        type: "dir",
        relativePath: path.normalize("dir 1"),
        children: [{
          name: "dir 2",
          type: "dir",
          relativePath: path.normalize("dir 1/dir 2"),
          children: [],
        }],
      },
      {
        name: "dir 3",
        type: "dir",
        relativePath: path.normalize("dir 3"),
        children: [
          {
            name: "dir 4",
            type: "dir",
            relativePath: path.normalize("dir 3/dir 4"),
            children: [
              {
                name: "dir 5",
                type: "dir",
                relativePath: path.normalize("dir 3/dir 4/dir 5"),
                children: [
                  {
                    name: "dir 6",
                    type: "dir",
                    relativePath: path.normalize("dir 3/dir 4/dir 5/dir 6"),
                    children: [{
                      name: "dir 7",
                      type: "dir",
                      relativePath: path.normalize("dir 3/dir 4/dir 5/dir 6/dir 7"),
                      children: [{
                        name: "dir 8",
                        type: "dir",
                        relativePath: path.normalize("dir 3/dir 4/dir 5/dir 6/dir 7/dir 8"),
                        children: [],
                      }],
                    }],
                  },
                  {
                    name: "dir 9",
                    type: "dir",
                    relativePath: path.normalize("dir 3/dir 4/dir 5/dir 9"),
                    children: [],
                  }
                ],
              },
              {
                name: "dir 10",
                type: "dir",
                relativePath: path.normalize("dir 3/dir 4/dir 10"),
                children: [],
              },
            ],
          },
          {
            name: "dir 11",
            type: "dir",
            relativePath: path.normalize("dir 3/dir 11"),
            children: [
              {
                name: "dir 12",
                type: "dir",
                relativePath: path.normalize("dir 3/dir 11/dir 12"),
                children: [{
                  name: "dir 13",
                  type: "dir",
                  relativePath: path.normalize("dir 3/dir 11/dir 12/dir 13"),
                  children: [],
                }],
              },
              {
                name: "dir 14",
                type: "dir",
                relativePath: path.normalize("dir 3/dir 11/dir 14"),
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "dir 15",
        type: "dir",
        relativePath: path.normalize("dir 15"),
        children: [],
      },
    ]);
  });
});

describe(`${parseSchemeToDirectoryTree.name}: Invalid & weird inputs`, () => {
  it("Returns empty array for empty or obviously invalid input", () => {
    expect(parseSchemeToDirectoryTree(Symbol())).toStrictEqual([]);
    expect(parseSchemeToDirectoryTree(() => "hey")).toStrictEqual([]);
    expect(parseSchemeToDirectoryTree("")).toStrictEqual([]);
    expect(parseSchemeToDirectoryTree(`
    `)).toStrictEqual([]);
    expect(parseSchemeToDirectoryTree(`
    
    
    
    `)).toStrictEqual([]);
  });
  
  it("Ignores invalid force type flags", () => {
    expect(parseSchemeToDirectoryTree(`
      sample /files
    `)).toStrictEqual([{
      name: "sample /files",
      type: "dir",
      relativePath: path.normalize("sample /files"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample /dirs
    `)).toStrictEqual([{
      name: "sample /dirs",
      type: "dir",
      relativePath: path.normalize("sample /dirs"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample /file      k
    `)).toStrictEqual([{
      name: "sample /file      k",
      type: "dir",
      relativePath: path.normalize("sample /file      k"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample /dir _9
    `)).toStrictEqual([{
      name: "sample /dir _9",
      type: "dir",
      relativePath: path.normalize("sample /dir _9"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample //file
    `)).toStrictEqual([{
      name: "sample //file",
      type: "dir",
      relativePath: path.normalize("sample /file"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample //dir
    `)).toStrictEqual([{
      name: "sample //dir",
      type: "dir",
      relativePath: path.normalize("sample /dir"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample \\/file
    `)).toStrictEqual([{
      name: "sample \\/file",
      type: "dir",
      relativePath: path.normalize("sample \\/file"),
      children: [],
    }]);
    
    expect(parseSchemeToDirectoryTree(`
      sample \\/dir
    `)).toStrictEqual([{
      name: "sample \\/dir",
      type: "dir",
      relativePath: path.normalize("sample \\/dir"),
      children: [],
    }]);
  });
  
  it("Ignores entries with duplicate names & its children", () => {
    // Ignores duplicate entries
    expect(parseSchemeToDirectoryTree(`
      notes
      -| books.txt
      -| books.txt
      -| books.txt
      -| books.txt
    `)).toStrictEqual([{
      name: "notes",
      type: "dir",
      relativePath: path.normalize("notes"),
      children: [{
        name: "books.txt",
        type: "file",
        relativePath: path.normalize("notes/books.txt"),
        children: [],
      }],
    }]);
    
    // 0-scope
    expect(parseSchemeToDirectoryTree(`
      dir 1
      dir 1
      dir 2
    `)).toStrictEqual([
      {
        name: "dir 1",
        type: "dir",
        relativePath: path.normalize("dir 1"),
        children: [],
      },
      {
        name: "dir 2",
        type: "dir",
        relativePath: path.normalize("dir 2"),
        children: [],
      },
    ]);
    
    // Filters out duplicate files & folders (altogether with its content) allowing repeating names
    // in different scopes
    expect(parseSchemeToDirectoryTree(`
      downloads
      - | whitepaper.pdf
      - | cake_recipe.docx
      - | stylesheets.css
      - | whitepaper.pdf
      - | stylesheets.js
      todos
        -| downloads
        -| cake_recipe.docx
      downloads
        -| index.html 
      
    `)).toStrictEqual([
      {
        name: "downloads",
        type: "dir",
        relativePath: path.normalize("downloads"),
        children: [
          {
            name: "whitepaper.pdf",
            type: "file",
            relativePath: path.normalize("downloads/whitepaper.pdf"),
            children: [],
          },
          {
            name: "cake_recipe.docx",
            type: "file",
            relativePath: path.normalize("downloads/cake_recipe.docx"),
            children: [],
          },
          {
            name: "stylesheets.css",
            type: "file",
            relativePath: path.normalize("downloads/stylesheets.css"),
            children: [],
          },
          {
            name: "stylesheets.js",
            type: "file",
            relativePath: path.normalize("downloads/stylesheets.js"),
            children: [],
          },
        ],
      },
      {
        name: "todos",
        type: "dir",
        relativePath: path.normalize("todos"),
        children: [
          {
            name: "downloads",
            type: "dir",
            relativePath: path.normalize("todos/downloads"),
            children: [],
          },
          {
            name: "cake_recipe.docx",
            type: "file",
            relativePath: path.normalize("todos/cake_recipe.docx"),
            children: [],
          },
        ]
      },
    ]);
  });
  
  it("Does not create scope on file entry", () => {
    expect(parseSchemeToDirectoryTree(`
      main.cpp
      - | vendor
    `)).toStrictEqual([{
      name: "main.cpp",
      type: "file",
      relativePath: path.normalize("main.cpp"),
      children: [],
    }]);
  });
  
  it("Ignores out of scope entries", () => {
    expect(parseSchemeToDirectoryTree(`
      -| ignored-file.txt
      -| ignored.dir /dir
      -| notes.txt
      Downloads
      --| movies
      -| install.cmd
    `)).toStrictEqual([{
      name: "Downloads",
      type: "dir",
      relativePath: path.normalize("Downloads"),
      children: [{
        name: "install.cmd",
        type: "file",
        relativePath: path.normalize("Downloads/install.cmd"),
        children: [],
      }],
    }]);
  });
  
  it("Ignores files with no name", () => {
    expect(parseSchemeToDirectoryTree(`
    
      folder
      
    `)).toStrictEqual([{
      name: "folder",
      type: "dir",
      relativePath: path.normalize("folder"),
      children: [],
    }])
  });
  
  it("Doesn't let to specify depth for files with no names", () => {
    expect(parseSchemeToDirectoryTree(`
      folder
      - |  
      - | presentation.ppt
    `)).toStrictEqual([
      {
        name: "folder",
        type: "dir",
        relativePath: path.normalize("folder"),
        children: [],
      },
      {
        name: "- |",
        type: "dir",
        relativePath: path.normalize("- |"),
        children: [{
          name: "presentation.ppt",
          type: "file",
          relativePath: path.normalize("- |/presentation.ppt"),
          children: [],
        }],
      },
    ])
  });
});