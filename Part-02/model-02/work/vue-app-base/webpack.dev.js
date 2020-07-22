// const merge = require('webpack-merge')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  // 因为系统不同 eslint报错太多 这里先注释掉  如果要使用eslint 就打开注释 直接运行
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|vue)$/,
  //       exclude: '/node_modules/',
  //       use: 'eslint-loader',
  //       enforce: 'pre'
  //     }
  //   ]
  // },
  devServer: {
    contentBase: './public',
    port: 10001,
    hot: true
  }
})
