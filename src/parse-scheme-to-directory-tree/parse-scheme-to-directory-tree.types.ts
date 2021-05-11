export type ForceTypeFlags = "dir" | "file";

export interface DirentDescription {
  name: string,
  type: ForceTypeFlags,
  relativePath: string,
  children: DirentDescription[],
}

export interface Scope {
  depth: number,
  relativePath: string,
  parentRef: DirentDescription[],
};

export type DirectoryTree = DirentDescription[];

export interface ParseSchemeToDirectoryTree {
  (rawScheme: string): DirectoryTree,
}