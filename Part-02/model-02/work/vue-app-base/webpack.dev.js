// const merge = require('webpack-merge')
const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common')
let a = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  // module: {
  //   // rules: [
  //   //   {
  //   //     test: /\.js$/,
  //   //     use: {}
  //   //   }
  //   // ]
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 10011,
    hot: true
  }
})
console.log(a)
module.exports = a