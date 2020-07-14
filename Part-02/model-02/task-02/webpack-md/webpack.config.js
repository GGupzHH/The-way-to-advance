const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markeddown-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 默认创建index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugins Sample',
      meta: {
        viewprot: 'width=device-width'
      },
      // 定义模板文件路径 HTML模板中可以使用<%= htmlWebpackPlugin.options.title %> 去或得一些数据
      template: './src/index.html'
    }),
    // 可以创建多个HTML页面 适用于多页面应用
    new HtmlWebpackPlugin({
      filename: 'temp.html'
    }),
    // 将制定目录文件复制到dist下面
    new CopyWebpackPlugin({
      patterns: [
        { from: 'image', to: '.' },
        { from: 'image', to: 'image' }
      ],
    })
  ]
}
