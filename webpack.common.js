const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "$root": __dirname,
    },
  },
  target: "node",
  externals: [
    nodeExternals(),
  ],
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      // Transpile code with Babel
      {
        test: /\.(t|j)s$/,
        loader: "babel-loader",
        options: {
          configFile: false,
          presets: [
            ["@babel/preset-env", {
              corejs: 3,
              useBuiltIns: "usage",
            }],
          ],
          plugins: [
            "@babel/plugin-transform-runtime",
          ]
        },
      },
      // Compile TypeScript
      {
        test: /\.ts$/,
        loader: "ts-loader",
      }
    ],
  },
};