// const merge = require('webpack-merge')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './public',
    port: 10001,
    hot: true
  }
})
