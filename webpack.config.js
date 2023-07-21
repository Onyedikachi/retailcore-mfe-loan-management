const { merge } = require("webpack-merge");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Sterling",
    projectName: "create-credit-product",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ["@Sterling-shared"],
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 8083,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      client: {
        webSocketURL: {
          port: 8083,
        },
      },
      allowedHosts: "all",
      https: true,
    },
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
      }),
    ],
  });
};
