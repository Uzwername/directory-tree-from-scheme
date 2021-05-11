import fs from "fs";
import path from "path";
import util from "util";
import { DirentDescriptionInfo, BuildDirectoryTreeLayers } from "@/mkdir-tree/mkdir-tree.types";

const fsOpen = util.promisify(fs.open);
const fsClose = util.promisify(fs.close);
const mkdir = util.promisify(fs.mkdir);
const touch = async (filePath: string) => {
  const fileDescriptor = await fsOpen(filePath, "a");
  
  /**
   * If this code is reached, we have created or opened a file & fileDescriptor must be available. However, We can't do much if
   * fsClose fails due to some rare circumstances while it doesn't affect whether file is created or not, so,
   * we just silently ignore errors it emits if any. 
   */
  try {
    await fsClose(fileDescriptor);
  } catch {} // eslint-disable-line no-empty
};

// Exactly the same as async mkdir but doesn't throw if directory already exists
const touchDir = async (filePath: string) => {
  try {
    await mkdir(filePath)
  } catch (error) {
    if (error?.code === "EEXIST") {
      return;
    }
    throw error;
  }
};

export const buildDirectoryTreeLayers: BuildDirectoryTreeLayers = async (basePath, dirTreeVerticalSlice) => {
  if (!dirTreeVerticalSlice.length) {
    return [];
  }
  
  let output: DirentDescriptionInfo[] = [];
  
  const currentLayerPromises = dirTreeVerticalSlice.map(async direntDescription => {
    const entryPath = path.join(basePath, direntDescription.relativePath);
    
    try {
      if (direntDescription.type === "file") {
        await touch(entryPath);
      } else {
        await touchDir(entryPath);
      }
      
      return {
        path: entryPath,
        status: "success",
        dirent: direntDescription, 
      } as DirentDescriptionInfo;
    } catch (error) {
      return {
        path: entryPath,
        status: "error",
        dirent: direntDescription,
        error,
      } as DirentDescriptionInfo;
    }
  });
  
  const currentLayerResults = await Promise.all(currentLayerPromises)
    
  output = output.concat(
    currentLayerResults,
    // Process the next slice
    await buildDirectoryTreeLayers(
      basePath,
      // Only process children of those elements that were created successfully
      currentLayerResults
        .filter(direntInfo => direntInfo.status === "success")
        .flatMap(direntInfo => direntInfo.dirent.children),
    ),
  );
    
  return output;
};