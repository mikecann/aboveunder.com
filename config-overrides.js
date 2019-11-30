const {
  override,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");

module.exports = override(
  disableEsLint(),

  addWebpackModuleRule({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "@svgr/webpack",
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  }),

  addWebpackAlias({
    "react-dom": "@hot-loader/react-dom",
  })
);
