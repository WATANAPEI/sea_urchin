const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
//const environment = process.env.NODE_ENV || "dev";

module.exports = {
  entry: path.resolve(__dirname, "./client/index.tsx"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ],
        exclude: [/node_modules/, /test/]
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "source-map-loader",
            options: {
              enforce: "pre",
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ],
        exclude: [/node_modules/, /test/]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "client"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", "tsx", ".json"]
//    alias: { userEnv$: path.resolve(__dirname, `.env/${environment}.ts`) }
  },
  output: {
    path: path.resolve("/www", "app", "lang", "words"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, './client/index.html')})
  ]
};
