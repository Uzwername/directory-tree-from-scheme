const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const commonWebpackConfig = require("./webpack.common");

module.exports = merge(commonWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new ESLintPlugin({
      fix: true,
      extensions: ["ts", "js"],
    }),
  ],
});