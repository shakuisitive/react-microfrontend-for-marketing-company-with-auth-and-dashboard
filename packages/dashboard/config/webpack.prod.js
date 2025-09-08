let { merge } = require("webpack-merge");
let ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
let packageJson = require("../package.json");
let commonConfig = require("../config/webpack.common");

let prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/dashboard/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
