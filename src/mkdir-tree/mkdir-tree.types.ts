import { DirentDescription } from "@/parse-scheme-to-directory-tree/parse-scheme-to-directory-tree.types";

export interface DirentDescriptionInfo {
  path: string,
  status: "success" | "error",
  dirent: DirentDescription,
  error?: unknown,
};

export interface BuildDirectoryTreeLayers {
  (basePath: string, dirTreeVerticalSlice: DirentDescription[]): Promise<DirentDescriptionInfo[]>;
}

export interface MkdirTree {
  (dirPath: string, scheme: string): never | never[] | ReturnType<BuildDirectoryTreeLayers>;
}