const { merge } = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common");
const commonBinConfig = require("./webpack.bin");

const packageProdConfig = merge(commonWebpackConfig, {
  mode: "production",
  output: {
    clean: true,
  },
});

const binProdConfig = merge(packageProdConfig, commonBinConfig);

module.exports = [
  packageProdConfig,
  binProdConfig,
];