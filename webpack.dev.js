const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const commonWebpackConfig = require("./webpack.common");
const commonBinConfig = require("./webpack.bin");


const packageDevConfig = merge(commonWebpackConfig, {
  mode: "development",
  output: {
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
      extensions: ["ts", "js"],
    }),
  ],
});

const binDevConfig = merge(packageDevConfig, commonBinConfig);

module.exports = [
  packageDevConfig,
  binDevConfig,
];

