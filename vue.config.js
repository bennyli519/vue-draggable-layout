/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-08-25 11:30:41
 */
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
  },
  devServer:{
    proxy:{
      '/api': {
          target: 'http://app.workiee.com/ptExt/fzy/diy/webApi',
          secure: true,
          changeOrigin: true,
          pathRewrite: {
              '/api': ''
          }
      }

    }
  }
}