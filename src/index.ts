import fs from "fs";
import util from "util";

const open = util.promisify(fs.open);
const mkdir = util.promisify(fs.mkdir);
const touch = (filepath: string) => open(filepath, "a");

const makeDirectoryTreeFromScheme = () => {
  fs.readdir(".", console.log);
};

export default makeDirectoryTreeFromScheme;