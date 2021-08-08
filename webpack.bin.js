const path = require("path");
const ShebangPlugin = require('webpack-shebang-plugin');
const packageJson = require("./package.json");

const BIN_FOLDER = path.resolve(__dirname, "bin");

module.exports = {
  entry: path.join(BIN_FOLDER, `${packageJson.name}.ts`),
  output: {
    filename: `${packageJson.name}.js`,
    path: BIN_FOLDER,
    clean: false,
  },
  plugins: [
    new ShebangPlugin(),
  ]
};