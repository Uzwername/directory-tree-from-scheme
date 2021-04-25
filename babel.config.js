// This file is needed only for Jest
module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: "current"
      }
    }],
    "@babel/preset-typescript",
  ],
};