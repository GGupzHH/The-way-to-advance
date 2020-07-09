const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dllPath = 'public/vendor'
module.exports = {
  entry: {
    vendor: [
      'vue',
      'vue-router/dist/vue-router.esm.js',
      'axios',
      'element-ui',
      'echarts'
    ]
  },
  output: {
    path: path.join(__dirname, 'public/vendor'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
