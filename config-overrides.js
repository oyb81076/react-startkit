/* eslint-disable */
const {
  override,
  addBabelPlugins,
  overrideDevServer,
} = require("customize-cra");

module.exports = {
  webpack: override(addBabelPlugins("@emotion")),
  devServer: overrideDevServer((config) => ({
    ...config,
    proxy: {
      "/api": "http://127.0.0.1:8080",
    },
  })),
};
