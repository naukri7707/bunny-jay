// vue.config文檔 https://cli.vuejs.org/zh/config/

const webpack = require("webpack");

module.exports = {
  // 基礎路徑
  publicPath: "/",

  // 生產檔案儲存位置
  outputDir: "dist",

  // 是否在儲存的時候使用 `eslint-loader` 進行檢查。
  // 有效的值：`ture` | `false` | `"error"`
  // 當設定為 `"error"` 時，檢查出的錯誤會觸發編譯失敗。
  lintOnSave: true,

  // 使用帶有瀏覽器內編譯器的完整構建版本
  // compiler: false,

  // 實時編譯器，開啟以使用 template
  runtimeCompiler: true,

  // webpack 內部配置。
  chainWebpack: () => {},
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },

  // vue-loader 配置
  // vueLoader: {},

  // 是否在生產環境下建構 source map？
  productionSourceMap: false,

  // 在生產環境下為 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核機器下會預設開啟。
  parallel: require("os").cpus().length > 1,

  // 是否使用 `autoDLLPlugin` 分割供應的包？
  // 也可以是一個在 DLL 包中引入的依賴的顯性的陣列。
  // dll: false,

  // PWA 外掛的選項。
  pwa: {},

  // webpack-dev-server 配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: "http://localhost:8088"
  },

  // CSS 配置
  css: {
    // 將元件內的 CSS 提取到一個單獨的 CSS 檔案 (只用在生產環境中)
    extract: true,

    // 是否開啟 CSS source map？
    sourceMap: false,

    // 為所有的 CSS 及其預處理檔案開啟 CSS Modules。
    // 這個選項不會影響 `*.vue` 檔案。
    requireModuleExtension: true,

    // 前處理器的 loader 的自定義選項
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/index.scss";
        `
      }
    }
  },

  // 三方外掛的選項
  pluginOptions: {}
};
