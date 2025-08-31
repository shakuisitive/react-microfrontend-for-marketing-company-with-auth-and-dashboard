let { merge } = require("webpack-merge");
let ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
let commonConfig = require("./webpack.common");
let packageJson = require("../package.json");

let domain = process.env.PRODUCTION_DOMAIN;

let prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
