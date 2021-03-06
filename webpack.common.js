const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "commonjs2",
      export: "default",
    },
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
        options: {
          compiler: "ttypescript",
        }
      },
    ],
  },
};