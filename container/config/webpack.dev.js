let { merge } = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let commonConfig = require("./webpack.common");

let devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
