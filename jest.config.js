const projectInfo = require("./package.json");

module.exports = async () => {
  return {
    name: projectInfo.name,
    rootDir: __dirname,
    testEnvironment: "node",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "^\\$root/(.*)$": "<rootDir>/$1",
    },
  };
};