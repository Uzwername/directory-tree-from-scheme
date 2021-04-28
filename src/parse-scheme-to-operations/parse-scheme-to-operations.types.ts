export type ForceTypeFlags = "dir" | "file";

export interface Operation {
  name: string,
  type: ForceTypeFlags,
  children: Operation[],
}

export interface ParseSchemeToOperations {
  (rawScheme: string): Operation[],
}

export interface Scope {
  depth: number,
  parentRef: Operation[],
};