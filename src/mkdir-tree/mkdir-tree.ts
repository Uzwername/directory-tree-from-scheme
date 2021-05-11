import path from "path";
import parseSchemeToDirectoryTree from "@/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree";
import { buildDirectoryTreeLayers } from "@/mkdir-tree/mkdir-tree-utils";
import { MkdirTree } from "@/mkdir-tree/mkdir-tree.types";

/**
 * Creates a directory structure inside `path` as specified by `scheme`.
 * 
 * @param {string} dirPath Relative or absolute path to directory where the directory tree specified by `scheme` will be created.
 * @param {string | DirectoryTree} scheme Directory tree description in form of string.
 * 
 * @throws In case if provided `dirPath` or `scheme` is invalid.
 * 
 * @returns {Promise<DirentDescriptionInfo>[]} A promise that resolves to an array of objects where each object represents creation process status of entries specified in `scheme`.
 */
const mkdirTree: MkdirTree = (baseDirPath, maybeRawScheme) => {
  if (typeof baseDirPath !== "string") {
    throw new TypeError(`Directory path must be a string, passed path's type was ${typeof baseDirPath}.`);
  } else if (0 >= baseDirPath.length) {
    throw new Error("Empty string cannot be used as a directory path.");
  }
  
  if (typeof maybeRawScheme !== "string") {
    throw new TypeError(`Scheme must be a string, passed scheme's type was ${typeof maybeRawScheme}.`);
  }
  
  if (!maybeRawScheme.length) {
    return [];
  }
  
  const basePath = path.resolve(baseDirPath);
  const dirTree = parseSchemeToDirectoryTree(maybeRawScheme);
  
  return buildDirectoryTreeLayers(basePath, dirTree);
};

export default mkdirTree;