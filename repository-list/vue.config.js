const path = require("path")
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  publicPath: "",
  outputDir: "www",
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => Object.assign({}, options, { name: "[name].[ext]" }))
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("moment", resolve("src/assets/js/vendor/moment.min.js"))
  },
  css: {
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }
  }
}
