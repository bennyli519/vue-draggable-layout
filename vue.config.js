const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  baseUrl: 'vue-draggable-layout',
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    devtool: 'source-map'
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}