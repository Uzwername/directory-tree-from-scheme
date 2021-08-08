#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import packageJson from "$root/package.json";
import mkdirTree from "@/index";

const NO_SCHEME_ERROR_MESSAGE = "Scheme is required.";
const USAGE = `
$0 (-d|--dir) ./my-project (-s|--scheme) '
dist
src
- | constants
- | utils
- | views
- | controllers
'
`.trim();

yargs(hideBin(process.argv))
  .scriptName(packageJson.name)
  .usage(USAGE)
  .command("$0", packageJson.description, yargs => {
    return yargs.option("dir", {
      type: "string",
      alias: "d",
      default: ".",
      describe: "Path to the target directory where the directory structure specified in the --scheme will be created.",
    }).option("scheme", {
      type: "string",
      alias: "s",
      demand: NO_SCHEME_ERROR_MESSAGE,
      describe: "Graphical description of the directory structure to create.",
    }).check(argv => {
      if (!argv.scheme.length) {
        throw new Error(NO_SCHEME_ERROR_MESSAGE);
      }
      
      if (!argv.dir.length) {
        throw new Error("Empty string cannot be used as a directory path.");
      }
      
      return true;
    })
  }, async argv => {
    try {
      const results = await mkdirTree(argv.dir, argv.scheme);
      
      const isAnyCreationError = results.some(info => info.status === "error");
      
      // 1 if a single error is present 0 otherwise.
      process.exitCode = Number(isAnyCreationError);
      // Log results so, the user can debug
      if (isAnyCreationError) {
        console.log(results);
      } 
    } catch (error) {
      console.log(error.message);
      process.exitCode = 1;
    }
  })
  .version(packageJson.version)
  .help()
  .alias("help", "h")
  .alias("version", "v")
  .argv;