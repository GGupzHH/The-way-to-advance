const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

class MyPlugin {
  apply(compiler) {
    // compiler 包含了webpack配置对象的信息和各种钩子函数 
    // 这个插件去处理打包之后的注释
    // 明确插件需要执行的时机
    // console.log(compiler.hooks.emit)

    // https://www.webpackjs.com/api/plugins/
    // emit 在文件打包之前执行的钩子函数
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation此次打包的上下文
      // console.log(compilation)
      for (let name in compilation.assets) {
        // assets存储的是文件  是一个对象  assets是文件名
        // 获取文件内容
        // compilation.assets[name].source()
        // 判断是否是js文件
        if(name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          // 然后将处理之后的内容再放入对应的文件名中
          compilation.assets[name] = {
            source: () => withoutComments,
            // 将内容和内容长度存入  webpack要求这样写
            size: () => withoutComments.length
          }
        }
      }
    })
    console.log('Myplugin 启动')
  }
}

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
    }),
    new MyPlugin()
  ]
}
