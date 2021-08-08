/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./bin/mkdir-tree.ts":
/*!***************************!*\
  !*** ./bin/mkdir-tree.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ \"core-js/modules/es.string.trim.js\");\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var yargs_yargs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yargs/yargs */ \"yargs/yargs\");\n/* harmony import */ var yargs_yargs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yargs_yargs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var yargs_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yargs/helpers */ \"yargs/helpers\");\n/* harmony import */ var yargs_helpers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(yargs_helpers__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var $root_package_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! $root/package.json */ \"./package.json\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/index */ \"./src/index.ts\");\n\n\n\n\n\n\n\nconst NO_SCHEME_ERROR_MESSAGE = \"Scheme is required.\";\nconst USAGE = `\n$0 (-d|--dir) ./my-project (-s|--scheme) '\ndist\nsrc\n- | constants\n- | utils\n- | views\n- | controllers\n'\n`.trim();\nyargs_yargs__WEBPACK_IMPORTED_MODULE_3___default()((0,yargs_helpers__WEBPACK_IMPORTED_MODULE_4__.hideBin)(process.argv)).scriptName($root_package_json__WEBPACK_IMPORTED_MODULE_5__.name).usage(USAGE).command(\"$0\", $root_package_json__WEBPACK_IMPORTED_MODULE_5__.description, yargs => {\n  return yargs.option(\"dir\", {\n    type: \"string\",\n    alias: \"d\",\n    default: \".\",\n    describe: \"Path to the target directory where the directory structure specified in the --scheme will be created.\"\n  }).option(\"scheme\", {\n    type: \"string\",\n    alias: \"s\",\n    demand: NO_SCHEME_ERROR_MESSAGE,\n    describe: \"Graphical description of the directory structure to create.\"\n  }).check(argv => {\n    if (!argv.scheme.length) {\n      throw new Error(NO_SCHEME_ERROR_MESSAGE);\n    }\n\n    if (!argv.dir.length) {\n      throw new Error(\"Empty string cannot be used as a directory path.\");\n    }\n\n    return true;\n  });\n}, async argv => {\n  try {\n    const results = await (0,_index__WEBPACK_IMPORTED_MODULE_6__.default)(argv.dir, argv.scheme);\n    const isAnyCreationError = results.some(info => info.status === \"error\");\n    process.exitCode = Number(isAnyCreationError);\n\n    if (isAnyCreationError) {\n      console.log(results);\n    }\n  } catch (error) {\n    console.log(error.message);\n    process.exitCode = 1;\n  }\n}).version($root_package_json__WEBPACK_IMPORTED_MODULE_5__.version).help().alias(\"help\", \"h\").alias(\"version\", \"v\").argv;\n\n//# sourceURL=webpack://mkdir-tree/./bin/mkdir-tree.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mkdir_tree_mkdir_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mkdir-tree/mkdir-tree */ \"./src/mkdir-tree/mkdir-tree.ts\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_mkdir_tree_mkdir_tree__WEBPACK_IMPORTED_MODULE_0__.default);\n\n//# sourceURL=webpack://mkdir-tree/./src/index.ts?");

/***/ }),

/***/ "./src/mkdir-tree/mkdir-tree-utils.ts":
/*!********************************************!*\
  !*** ./src/mkdir-tree/mkdir-tree-utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"buildDirectoryTreeLayers\": () => (/* binding */ buildDirectoryTreeLayers)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.flat-map.js */ \"core-js/modules/es.array.flat-map.js\");\n/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.unscopables.flat-map.js */ \"core-js/modules/es.array.unscopables.flat-map.js\");\n/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! util */ \"util\");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nconst fsOpen = util__WEBPACK_IMPORTED_MODULE_6___default().promisify((fs__WEBPACK_IMPORTED_MODULE_4___default().open));\nconst fsClose = util__WEBPACK_IMPORTED_MODULE_6___default().promisify((fs__WEBPACK_IMPORTED_MODULE_4___default().close));\nconst mkdir = util__WEBPACK_IMPORTED_MODULE_6___default().promisify((fs__WEBPACK_IMPORTED_MODULE_4___default().mkdir));\n\nconst touch = async filePath => {\n  const fileDescriptor = await fsOpen(filePath, \"a\");\n\n  try {\n    await fsClose(fileDescriptor);\n  } catch (_unused) {}\n};\n\nconst touchDir = async filePath => {\n  try {\n    await mkdir(filePath);\n  } catch (error) {\n    if ((error === null || error === void 0 ? void 0 : error.code) === \"EEXIST\") {\n      return;\n    }\n\n    throw error;\n  }\n};\n\nconst buildDirectoryTreeLayers = async (basePath, dirTreeVerticalSlice) => {\n  if (!dirTreeVerticalSlice.length) {\n    return [];\n  }\n\n  const currentLayerPromises = dirTreeVerticalSlice.map(async direntDescription => {\n    const entryPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(basePath, direntDescription.relativePath);\n\n    try {\n      if (direntDescription.type === \"file\") {\n        await touch(entryPath);\n      } else {\n        await touchDir(entryPath);\n      }\n\n      const result = {\n        path: entryPath,\n        status: \"success\",\n        dirent: direntDescription\n      };\n      return result;\n    } catch (error) {\n      const result = {\n        path: entryPath,\n        status: \"error\",\n        dirent: direntDescription,\n        error\n      };\n      return result;\n    }\n  });\n  const currentLayerResults = await Promise.all(currentLayerPromises);\n  const output = [];\n  return output.concat(currentLayerResults, await buildDirectoryTreeLayers(basePath, currentLayerResults.filter(direntInfo => direntInfo.status === \"success\").flatMap(direntInfo => direntInfo.dirent.children)));\n};\n\n//# sourceURL=webpack://mkdir-tree/./src/mkdir-tree/mkdir-tree-utils.ts?");

/***/ }),

/***/ "./src/mkdir-tree/mkdir-tree.ts":
/*!**************************************!*\
  !*** ./src/mkdir-tree/mkdir-tree.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _parse_scheme_to_directory_tree_parse_scheme_to_directory_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree */ \"./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.ts\");\n/* harmony import */ var _mkdir_tree_mkdir_tree_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/mkdir-tree/mkdir-tree-utils */ \"./src/mkdir-tree/mkdir-tree-utils.ts\");\n\n\n\n\nconst mkdirTree = (baseDirPath, maybeRawScheme) => {\n  if (typeof baseDirPath !== \"string\") {\n    throw new TypeError(`Directory path must be a string, passed path's type was ${typeof baseDirPath}.`);\n  } else if (0 >= baseDirPath.length) {\n    throw new Error(\"Empty string cannot be used as a directory path.\");\n  }\n\n  if (typeof maybeRawScheme !== \"string\") {\n    throw new TypeError(`Scheme must be a string, passed scheme's type was ${typeof maybeRawScheme}.`);\n  }\n\n  if (!maybeRawScheme.length) {\n    return [];\n  }\n\n  const basePath = path__WEBPACK_IMPORTED_MODULE_0___default().resolve(baseDirPath);\n  const dirTree = (0,_parse_scheme_to_directory_tree_parse_scheme_to_directory_tree__WEBPACK_IMPORTED_MODULE_1__.default)(maybeRawScheme);\n  return (0,_mkdir_tree_mkdir_tree_utils__WEBPACK_IMPORTED_MODULE_2__.buildDirectoryTreeLayers)(basePath, dirTree);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mkdirTree);\n\n//# sourceURL=webpack://mkdir-tree/./src/mkdir-tree/mkdir-tree.ts?");

/***/ }),

/***/ "./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree-utils.ts":
/*!************************************************************************************!*\
  !*** ./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree-utils.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"combinedForcedTypesRegExp\": () => (/* binding */ combinedForcedTypesRegExp),\n/* harmony export */   \"depthDelimiter\": () => (/* binding */ depthDelimiter),\n/* harmony export */   \"splitSchemeToCleanLines\": () => (/* binding */ splitSchemeToCleanLines)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ \"core-js/modules/es.regexp.constructor.js\");\n/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ \"core-js/modules/es.string.trim.js\");\n/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! os */ \"os\");\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst supportedForcedTypes = [\"file\", \"dir\"];\nconst combinedForcedTypesRegExp = new RegExp(`\\\\s\\\\/(${supportedForcedTypes.join(\"|\")})$`);\nconst depthDelimiter = Object.freeze({\n  pattern: /\\|\\s/,\n  length: 2\n});\nconst splitSchemeToCleanLines = scheme => scheme.split((os__WEBPACK_IMPORTED_MODULE_3___default().EOL)).reduce((accumulator, string) => {\n  const denseString = string.trim();\n  return denseString ? accumulator.concat(denseString) : accumulator;\n}, []);\n\n//# sourceURL=webpack://mkdir-tree/./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree-utils.ts?");

/***/ }),

/***/ "./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.ts":
/*!******************************************************************************!*\
  !*** ./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ \"core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _parse_scheme_to_directory_tree_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse-scheme-to-directory-tree-utils */ \"./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree-utils.ts\");\n\n\n\n\n\n\nconst parseSchemeToDirectoryTree = rawScheme => {\n  if (!rawScheme || typeof rawScheme !== \"string\") {\n    return [];\n  }\n\n  const rawOperationLines = (0,_parse_scheme_to_directory_tree_utils__WEBPACK_IMPORTED_MODULE_4__.splitSchemeToCleanLines)(rawScheme);\n  const operations = [];\n  let scopesStack = [{\n    depth: -1,\n    relativePath: \"\",\n    parentRef: operations\n  }];\n\n  const getTopScope = () => scopesStack[scopesStack.length - 1];\n\n  for (const rawOperationLine of rawOperationLines) {\n    let entryName;\n    const maybeDepthDelimiterIndex = rawOperationLine.search(_parse_scheme_to_directory_tree_utils__WEBPACK_IMPORTED_MODULE_4__.depthDelimiter.pattern);\n    const isDepthDelimiterPresent = maybeDepthDelimiterIndex > -1;\n    let depthIndicator;\n\n    if (isDepthDelimiterPresent) {\n      depthIndicator = rawOperationLine.slice(0, maybeDepthDelimiterIndex).replace(/\\s/g, \"\");\n      entryName = rawOperationLine.slice(maybeDepthDelimiterIndex + _parse_scheme_to_directory_tree_utils__WEBPACK_IMPORTED_MODULE_4__.depthDelimiter.length);\n    } else {\n      depthIndicator = \"\";\n      entryName = rawOperationLine;\n    }\n\n    const depth = depthIndicator.length;\n    const maybeForcedTypeSearchResults = rawOperationLine.match(_parse_scheme_to_directory_tree_utils__WEBPACK_IMPORTED_MODULE_4__.combinedForcedTypesRegExp);\n    const isEntryTypeForced = maybeForcedTypeSearchResults !== null;\n    let forcedEntryType;\n    let entryType;\n\n    if (isEntryTypeForced) {\n      const forcedTypeSearchResults = maybeForcedTypeSearchResults;\n      forcedEntryType = forcedTypeSearchResults[0];\n      entryName = entryName.slice(0, -forcedEntryType.length);\n      entryType = forcedTypeSearchResults[1];\n    } else {\n      entryType = path__WEBPACK_IMPORTED_MODULE_3___default().extname(rawOperationLine).length > 1 ? \"file\" : \"dir\";\n    }\n\n    const parsedDirent = {\n      name: entryName,\n      type: entryType,\n      relativePath: \"\",\n      children: []\n    };\n\n    if (depth - getTopScope().depth > 1) {\n      continue;\n    }\n\n    scopesStack = scopesStack.filter(({\n      depth: stackDepth\n    }) => depth > stackDepth);\n\n    if (getTopScope().parentRef.find(({\n      name: existingEntryName\n    }) => existingEntryName === entryName)) {\n      continue;\n    }\n\n    parsedDirent.relativePath = path__WEBPACK_IMPORTED_MODULE_3___default().join(getTopScope().relativePath, entryName);\n    getTopScope().parentRef.push(parsedDirent);\n\n    if (entryType === \"dir\") {\n      scopesStack.push({\n        depth,\n        relativePath: parsedDirent.relativePath,\n        parentRef: parsedDirent.children\n      });\n    }\n  }\n\n  return scopesStack[0].parentRef;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseSchemeToDirectoryTree);\n\n//# sourceURL=webpack://mkdir-tree/./src/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.ts?");

/***/ }),

/***/ "core-js/modules/es.array.flat-map.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.flat-map.js" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.array.flat-map.js");

/***/ }),

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.array.iterator.js");

/***/ }),

/***/ "core-js/modules/es.array.unscopables.flat-map.js":
/*!*******************************************************************!*\
  !*** external "core-js/modules/es.array.unscopables.flat-map.js" ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.array.unscopables.flat-map.js");

/***/ }),

/***/ "core-js/modules/es.promise.js":
/*!************************************************!*\
  !*** external "core-js/modules/es.promise.js" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.promise.js");

/***/ }),

/***/ "core-js/modules/es.regexp.constructor.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.regexp.constructor.js" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.regexp.constructor.js");

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.regexp.exec.js");

/***/ }),

/***/ "core-js/modules/es.string.replace.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.string.replace.js" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.string.replace.js");

/***/ }),

/***/ "core-js/modules/es.string.trim.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.string.trim.js" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.string.trim.js");

/***/ }),

/***/ "core-js/modules/es.symbol.description.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.symbol.description.js" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("core-js/modules/es.symbol.description.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "yargs/helpers":
/*!********************************!*\
  !*** external "yargs/helpers" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("yargs/helpers");

/***/ }),

/***/ "yargs/yargs":
/*!******************************!*\
  !*** external "yargs/yargs" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("yargs/yargs");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"name\":\"mkdir-tree\",\"version\":\"1.2.0\",\"description\":\"Generate directory tree from a scheme.\",\"main\":\"dist/index.js\",\"types\":\"dist/index.d.ts\",\"private\":false,\"files\":[\"dist/\"],\"bin\":\"./bin/mkdir-tree.js\",\"scripts\":{\"prepublishOnly\":\"npm run build && npm run test\",\"dev\":\"webpack --mode=development --config=webpack.dev.js --watch\",\"build\":\"webpack --mode=production --config=webpack.prod.js\",\"test\":\"jest\",\"test:watch\":\"jest --watchAll\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Uzwername/directory-tree-from-scheme.git\"},\"bugs\":{\"url\":\"https://github.com/Uzwername/directory-tree-from-scheme/issues\"},\"homepage\":\"https://github.com/Uzwername/directory-tree-from-scheme#readme\",\"keywords\":[\"directory tree\",\"directory scheme\",\"directory structure\",\"generate directory tree\",\"create directory structure\",\"directory tree from scheme\",\"scaffolding\",\"create scaffold\",\"set up scaffold\"],\"author\":{\"name\":\"Igor Bykov\",\"email\":\"igor.bykov@protonmail.com\"},\"license\":\"MIT\",\"engines\":{\"node\":\">=8.0.0\"},\"dependencies\":{\"@babel/runtime\":\"^7.14.8\",\"core-js\":\"^3.16.0\",\"yargs\":\"^17.1.0\"},\"devDependencies\":{\"@babel/core\":\"^7.15.0\",\"@babel/plugin-transform-runtime\":\"^7.15.0\",\"@babel/preset-env\":\"^7.15.0\",\"@babel/preset-typescript\":\"^7.15.0\",\"@types/node\":\"^14.14.41\",\"@typescript-eslint/eslint-plugin\":\"^4.29.0\",\"@typescript-eslint/parser\":\"^4.29.0\",\"babel-loader\":\"^8.2.2\",\"eslint\":\"^7.32.0\",\"eslint-webpack-plugin\":\"^3.0.1\",\"jest\":\"^27.0.6\",\"shebang-loader\":\"^0.0.1\",\"ts-loader\":\"^9.2.5\",\"ttypescript\":\"^1.5.12\",\"typescript\":\"^4.3.5\",\"typescript-transform-paths\":\"^3.2.1\",\"webpack\":\"^5.49.0\",\"webpack-cli\":\"^4.7.2\",\"webpack-merge\":\"^5.8.0\",\"webpack-node-externals\":\"^3.0.0\"}}');\n\n//# sourceURL=webpack://mkdir-tree/./package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./bin/mkdir-tree.ts");
/******/ 	module.exports = __webpack_exports__.default;
/******/ 	
/******/ })()
;