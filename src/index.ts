import fs from "fs";
import util from "util";

const open = util.promisify(fs.open);
const mkdir = util.promisify(fs.mkdir);
const touch = (filepath: string) => open(filepath, "a");

interface MakeDirectoryTreeFromScheme {
  (path: string, scheme: string): Promise<boolean>;
}

const makeDirectoryTreeFromScheme: MakeDirectoryTreeFromScheme = async (path, scheme) => {
  
  return true;
};

export default makeDirectoryTreeFromScheme;