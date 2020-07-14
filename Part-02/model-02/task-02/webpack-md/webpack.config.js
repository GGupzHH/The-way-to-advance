const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    new CleanWebpackPlugin()
  ]
}
