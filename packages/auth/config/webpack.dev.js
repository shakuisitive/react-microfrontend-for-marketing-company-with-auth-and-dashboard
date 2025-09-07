let { merge } = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
let commonConfig = require("./webpack.common");
let packageJson = require("../package.json");

let devConfig = {
  mode: "development",
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
