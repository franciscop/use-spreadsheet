const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

module.exports = {
  entry: path.join(__dirname, "./index.js"),
  mode: "production",
  output: {
    path: __dirname,
    filename: "index.min.js",
    library: "index",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react")
    }
  },
  externals: {
    // Don't bundle react
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    }
  }
};
