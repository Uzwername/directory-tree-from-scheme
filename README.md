# mkdir-tree
[![npm](https://img.shields.io/npm/v/mkdir-tree)](https://www.npmjs.com/package/mkdir-tree)
[![npm type definitions](https://img.shields.io/npm/types/mkdir-tree)](https://www.npmjs.com/package/mkdir-tree)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/Uzwername/directory-tree-from-scheme)](https://www.npmjs.com/package/mkdir-tree)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Uzwername/directory-tree-from-scheme/blob/master/LICENSE)

Create an entire directory structure in one go.<br />The [`tree` command](https://en.wikipedia.org/wiki/Tree_(command)) setter written in Node.js.

Lightweight, efficient, declarative, opinion-less & extremely easy to use.

# Features

+ 📜 **License:** MIT
+ 🛠 **Compatibility:** Node >= 8
+ ⌨️ **Typescript:** TypeScript Typings built-in
+ 🧰 **Dependencies:** 0 dependencies except [`babel`](https://babeljs.io/)-related

# Install

```sh
npm i mkdir-tree

# or

yarn add mkdir-tree
```

# Use

Import the package:
```js
const mkdirTree = require("mkdir-tree");

// or 

import mkdirTree from "mkdir-tree";
```

Create the desired directory structure in one function call:
```js
mkdirTree('.', `
  package.json
  dist
  src
  - | containers
  - | components
  - | constants
  - - | index.ts
  - | store
  - - | reducers
  - - - | README.md  
`);
```

`mkdirTree` accepts 2 arguments `dirPath` & `scheme`.

| Name      | Type                 | Required | Description                                                                                           |
| --------- | -------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| dirPath | string | Yes      | Relative or absolute path to the target directory where the directory structure specified by the `scheme` will be built. |
| scheme     | string               | Yes       | Graphical description of the directory structure to create. |

## Entry Types

By default each entry that has something similar to an extension in its name is considered to be a file.

For instance, `file.txt`, `index.js` & `.eslintrc.js` are considered to be files while `.git`, `folder`, `constants` considered to be directories.

You can also force entry type if you want to by specifying `/file` or `/dir` flag like this:

```js
mkdirTree('.', `
  files.code /dir
    - | index.ts 
`);
```

Please note that the flag must be preceded by a space-like character.

## Notes

### Partially created directory trees

It's safe to call `mkdirTree` on directories that already have parts of the directory tree specified in `scheme`.
Existing files & directories will not be affected while new files & folders will be created.

### Errors

`mkdirTree` returns **a promise that always resolves to an array of objects**, however, it might throw synchronously in case if `dirPath` or `scheme` is missing or empty.

To avoid this, ensure that both `dirPath` & `scheme` are non-empty strings before calling `mkdirTree` or wrap call to `mkdirTree` into [`try...catch` block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).

### Entries names

This package is opinion-less regarding filenames & does not perform any file/directory name validation.

If you specify a name that is invalid on your OS, the creation of the entry & all its children will fail.

If you want to make sure that names of your entries are ok, you might be looking for [filenamify](https://www.npmjs.com/package/filenamify).<br />[filenamify](https://www.npmjs.com/package/filenamify) could be used together with this package.

### Scheme format

Scheme format has only 3 rules:

+ Entries are divided by new line character(/s) (`\n` or `\n\r`).
+ Flags (`/dir` & `/file`) must be preceded by a space-like character & must be the last characters (apart from arbitrary space-like characters) in the line.
+ Level indicator (`|`) must be followed by a space-like character & must be preceded only by a correct number of depth indicators (`-`) and arbitrary number of space-like characters.

Please note that entries that have an incorrect number of depth indicators will be ignored.

### Return

`mkdirTree` returns a Promise that resolves to an array of objects that look like this:

```js
{
  path: '/absolute-path-part/entry/path.txt',
  status: 'success' /* or */ 'error',
  dirent: {
    name: 'path.txt',
    type: 'dir' /* or */ 'file',
    relativePath: 'entry/path.txt',
    children: [/* Recursive array of children entries that have the same shape as "dirent" property */]
  },
  /* If 'status' is 'error', 'error' property will also be present. It will contain the error that happened while trying to create the entry. */
  error: Error
},
```

Those objects might be present in any order. No particular order is guaranteed & the current behavior might change in future versions.