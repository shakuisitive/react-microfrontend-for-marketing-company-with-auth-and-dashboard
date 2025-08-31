let { merge } = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
let commonConfig = require("./webpack.common");
let packageJson = require("../package.json");

let devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
