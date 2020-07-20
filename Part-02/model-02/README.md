## &#x1F964; model-02 模块化开发与规范化标准> ES Modules 特性

### &#x1F47E; 模块化开发
#### &#x1F4DA; 模块化开发
  - 按照功能的不同区划分不同的代码

#### &#x1F4DA; 模块化演变过程
  - 每一个单独的文件就是一个模块
  - 命名空间的方式
  - 自调用函数

#### &#x1F4DA; 模块化规范的出现
  - commonJS 规范  同步模式加载 (node)
    - 一个文件就是一个模块
    - 每个模块都有单独的作用域
    - 通过module.exports导出成员
    - 通过require函数载入模块
  - AMD(Asynchronous Module Defintion)(异步的模块规范)
    - require.js
    - AMD使用起来相对复杂
    - 模块js文件请求频繁
    - ![Image text](../image/image-03.jpg)
  - sea.js + CMD
    - ![Image text](../image/image-04.jpg)

#### &#x1F4DA; 模块化标准规范
  - node环境   -> commonJS 规范
  - 浏览器环境 -> ES Modules

#### &#x1F4DA; ES Modules 基本特性
  - 默认采用严格模式执行  忽略 'use strict'的声明
  - 每个ES Module 都是单独的私有作用域
  - ESM 通过CORS请求外部JS模块 请求地址必须支持CORS
  - ESM 的 script 标签会延迟执行  等待当前浏览器DOM渲染之后执行 类似 defer

#### &#x1F4DA; ES Modules 导出
  - ![Image text](../image/image-05.jpg)

#### &#x1F4DA; ES Modules 导入导出注意事项
  - export { foo, add }  
    ```txt
      这种语法的导出看似是一个字面量对象 实则不是 这只是export的写法  这不是一个对象
      export default { foo, add } 这样才是导出一个对象
    ```
  - export 导出的是变量的引用 即使是简单数据类型也是引用
  - export 导出的是只读的 并不能在导出的文件中更改
  - import { foo, add } from './app.js'
    ```txt
      import 并不是一个解构
      如果我们导出 export default { foo, add }
      这样导入是报错的 import { foo, add } from './app.js'
      所以这里的import不是解构  就像export导出一样 就就是一种固定的语法
    ```
  - import 导入的路径问题
    - 相对路径必须写完整 在ESmodule当中
    - 文件后缀必须写完整
    - 可以直接导入CDN的文件
    - 可以使用绝对路径
    - 如果只想要执行导入的模块直接引入就ok了 
      ```js
        import {} from './app.js'
        // 简写 直接加载这个模块 并不需要提取模块的变量
        import './app.js'
      ```
    - 如果一个模块导出的成员很对  那么在导入的时候可以使用* 的方式重命名获取
      ```js
        // 导入的成员会以对象的方式存在于echarts
        import * as echarts from 'echarts'
        console.log(echarts)
      ```
    - 动态导入
      ```js
        // 提供了一个全局import函数 该函数返回一个Promise实例 所以可以在回调用获取导入的数据
        import('./app.js').then(data => {
          console.log(data)
        })
      ```
    - 导入具名成员和默认成员
      ```js
        // 导出
        export { foo, add }
        export default name
      ```
      ```js
        // 导入
        // 1. 默认导出的可以直接再导入中写 
        import name, { foo, add } from './app.js' 
        // 2. 也可以重命名写
        import { foo, add, default as names } from './app.js' 
      ```

#### &#x1F4DA; ES Modules 导出导入的模块
  - 运用场景
    ```txt
      写了很多子组件  
      需要在根组件中导入引用 
      但是我不想在根组件导入那么一堆
    ```
    ```js
      // 三个组件
      // button
      // header
      // footer
      // index是我的根组件
      // 我可以用一个中间的文件将这几个组件集中导入 然后集中导出
      // middle.js 
      // 这样的写法可以直接将导入的内容直接导出
      export { header } from './header.js'
      export { footer } from './footer.js'
      export { button } from './button.js'

      // index
      import { header, footer, button } from './middle.js'

      // 如果别的模块是默认导出
      // 那么在导入导出的时候需要重命名
      export { default as header} from './footer.js'
      // 或许可以这样
      export header from './footer.js'
    ```

#### &#x1F4DA; ES Modules 浏览器环境 Polyfill
  - 可以使用第三方库引入处理
  - 比如我们一个很普通的HTML文件代码用了导入导出 这时候在IE等一些浏览器无法执行
  - 此时我们引用 browser-es-module-loader
  - browser-es-module-loader会帮我们把代码执行
  - 但是会存在一个问题  在IE我们的代码是正常运行了  但是在Chrome代码会被执行两次 原因就是Chrome本身就支持模块的导入导出  浏览器本身会执行代码 但是引入的那个包也会帮你执行一次 这样就会执行两次
  - 解决方法
    ```html
      <!-- 这段代码会在当前浏览器不支持 module的情况下执行其中的代码  这样我们就可以在包导入的那个script加上这个关键词 -->
      <script nomodule>
        alert(123)
      </script>
    ```

#### &#x1F4DA; ES Modules in Node.js - 支持情况
  - 在node(8.5) 之后可以使用
  - 需要把文件后缀改为xxx.mjs
  - 执行 node --experimental-modules index.mjs  这个参数代表启用ESModule这个实验特性
  - 以上操作就是想要在node中使用 ESModule必须做的事情
  - 导入一些原生的模块 也可以直接导入第三方模块
    ```js
      import fs from 'fs'
    ```
    
#### &#x1F4DA; ES Modules in Node.js - 与 CommonJS 交互
  - ES Module 中可以导入 CommonJS 模块
  - CommonJS 中不能导入 ES Module 模块
  - CommonJS 始终都会导出一个默认成员
  - import 不是解构！！！！！！！！！！！！！！！！！！！！！！
  ```js
    // common.js
    // 1. common 导出
    const foo = 'zs'
    module.exports = foo

    // 2. import 不是解构
    module.exports = {
      name: 'zsd',
      age: 12
    }
  ```
  ```js
    // ES Module 
    // 1. 导入 common导出的内容
    import foo from './common.js'

    // 2. import 导入但是不能解构！！！
    √ import obj from './common.js'
    × import { name, age } from './common.js'
  ```

#### &#x1F4DA; ES Modules in Node.js - 与 CommonJS 的差异
  ```js
    // common中内置的一些全局变量 在ES Modules中怎么使用
    // 因为下面的变量是 Common 单独提供的
    // require
    // module
    // exports
    // __filename
    // __dirname
  ```
  ```js
    // ES Module
    // require
    // module
    // exports
    // 可以使用 ES Module 的 import 和 export代替

    // __filename
    // __dirname
    // 可以看下面怎么实现
    // ES Module 提供了 import.meta.url
    import { fileURLToPath } from 'url'
    import { dirname } from 'path'
    const __filename = fileURLToPath(import.meta.url)
    
    const __dirname = dirname(__filename)
  ```

#### &#x1F4DA; ES Modules in Node.js - 新版本进一步支持
  ```js
    如果想在node环境中直接使用ES Module  那么就在
    package.json中定义一个字段
    {
      "type": "module"
    }
    这样整个环境就是按照ES Modules 的规范来了
    但是这样commonJS 规范就不能使用了  
    想要使用的话就需要将common.js  改为 common.cjs去执行
  ```

### &#x1F47E; Webpack 打包
#### &#x1F4DA; 模块打包工具的由来
  - ES Module存在环境问题
  - 模块化文件过多 网络请求频繁
  - 不仅仅js需要模块
    ```txt
      所以就有了这样的想法 
      能使用模块化开发 并且能兼容各种环境运行
    ```
  - ![Image text](../image/image-06.jpg)


#### &#x1F4DA; 模块打包工具概要
  - webpack
    - 模块打包器 使用loader去处理代码兼容问题
    - 模块拆分(Code Splitting) 解决文件大的问题 实现增量加载(动态加载)
    - 资源模块(Asset Module) 其他类型的文件
    - 整个对前端项目的模块化 并不用担心环境的因素
    
#### &#x1F4DA; Webpack 快速上手
  - npm install webpack webpack-cli -g
  - webpack
  - 会默认找到index.js 打包
  - 之后可以将执行命令添加到package的script当中

#### &#x1F4DA; Webpack 快速上配置文件
  ```js
    // webpack.config.js   node 环境
    const path = require('path')
    module.exports = {
      // 入口
      entry: './src/main.js',
      // 出口
      output: {
        // 打包之后文件名
        filename: 'bundle.js',
        // 打包之后路径  就会在当前目录output下面打包
        path: path.join(__dirname, 'output')
      }
    }
  ```

#### &#x1F4DA; Webpack 工作模式
  ```js
    // webpack.config.js   node 环境
    const path = require('path')
    module.exports = {
      // 工作模式
      // 1. production 代码压缩 优化打包结果
      // 2. developme 优化打包速度 添加一些调试的辅助代码
      // 3. none 最原始状态的打包  不做任何处理
      // 具体差异可以在官网找到
      // 然后可以通过执行命令的时候动态传入
      // webpack --mode development
      mode: 'development',
      // 入口
      entry: './src/main.js',
      // 出口
      output: {
        // 打包之后文件名
        filename: 'bundle.js',
        // 打包之后路径  就会在当前目录output下面打包
        path: path.join(__dirname, 'output')
      }
    }
  ```

#### &#x1F4DA; Webpack 资源模块加载
  - webpack是整个前端的打包工具，可以打包任意类型的文件
  - 通过各种loader实现
    ```js
      // webpack.config.js   node 环境
    const path = require('path')

    module.exports = {
      mode: 'none',
      entry: './src/main.js',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
      },
      module: {
        rules: [
          {
            // 匹配类型文件
            test: /.css$/,
            // css-loader 的作用是处理css文件 将css代码打包让js处理 但是单独的css-loader只是打包处理 并没有引入
            // 所以又需要一个loader style-loader 
            // style-loader 通过style标签将css挂载到HTML中
            // 多个loader执行的时候从后往前执行 css-loader  ->  style-loader
            use: [
              'style-loader',
              'css-loader'
            ] 
          }
        ]
      }
    }
    ```
#### &#x1F4DA; Webpack 导入资源模块
  - 通过源码可以看到css也是通过js导入到项目的
  - 根据代码的需要动态的导入资源
  - 用js去驱动整个前端的业务功能
#### &#x1F4DA; Webpack 文件资源加载器
  - 加载一些image font 等 需要文件资源加载器
  - file-loader
    ```js
      const path = require('path')
      module.exports = {
        mode: 'none',
        entry: './scr/main.js',
        output: {
          filename: 'bundle.js',
          path: path.join(__dirname, 'output'),
          publicPath: 'dist/' // 绝对路径  后面要加 / !!!!!!!!!!!
        },
        // 正常这样处理之后 文件中加载图片是去网站根目录去找图片的 正确地址在dist文件下 
        // 所以需要在output中设置告诉webpack打包之后的文件存放在哪
        module: {
          rules: [
            {
              test: /.png$/',
              use: 'file-loader'
            }
          ]
        }
      }
    ```

#### &#x1F4DA; Webpack URL 加载器
  - 加载webpack中的文件 也可以使用url-loader 
  - url-loader 是使用Data URLs
  - Data URLs 是一种特殊得URL协议 可以用来表示任意文件  处理过后是
  - ![Image text](../image/image-07.jpg)
  - 也可以通过base64去处理
  - 最佳实践
    - 小文件 一般小于10KB 减少请求次数
    - 大文件单独提取处理还是使用file-loader去处理
    - 像下面的设置就是超过10KB的文件会按照file-loader去处理 处理文件单独存放和之前单独使用file-loader一样
    - 而小于10KB的文件会被处理成Data URLs嵌入代码当中
    ```js
      const path = require('path')
      module.exports = {
        mode: 'none',
        entry: './scr/main.js',
        output: {
          filename: 'bundle.js',
          path: path.join(__dirname, 'output'),
          publicPath: 'dist/' // 绝对路径  后面要加 / !!!!!!!!!!!
        },
        // 正常这样处理之后 文件中加载图片是去网站根目录去找图片的 正确地址在dist文件下 
        // 所以需要在output中设置告诉webpack打包之后的文件存放在哪
        module: {
          rules: [
            {
              test: /.png$/',
              // use: 'url-loader',
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10 * 1024 // 10KB  当文件大于10KB的时候自动去使用file-loader去处理文件  小于10KB的时候还是使用url-loader去处理
                  // 要想这样使用开发环境必须安装 file-loader 这里是url-loader内部去自动调用了file-loader
                }
              }
            }
          ]
        }
      }
    ```

#### &#x1F4DA; Webpack 常用加载器分类
  - 编译转换类
    - 会将加载的资源模块 转换为js代码
    - css-loader  将 css  转换为 以js形式工作的css模块
  
  - 文件操作类
    - 将文件拷贝到输出目录 同时将文件向外导出
    - file-loader
  
  - 代码质量检查类
    - 统一代码风格 提高代码质量
    - eslint-loader
  
  - 在后续接触的loader先了解类型是什么 作用 特点 是什么 使用需要注意什么 能干嘛

#### &#x1F4DA; Webpack 与 ES 2015
  - Webpack需要对模块进行打包， 所以默认会将import export做一些转换，但是并不能转换代码当中其他的ES6特性
  - 如果我们需要处理ES6 则需要另一个loader
  - npm install babel-loader @babel/core @babel/preset-env -d
    ```js
      module.exports = {
        mode: 'none',
        entry: '',
        output: {
          filename: '',
          path: '',
          publicPath: ''
        },
        module: {
          rules: [
            {
              test: /.js$/,
              // 这样写可以发现ES6并没有被处理
              //  因为babel 是一个代码转换的平台  我们得指定这个平台使用什么插件去处理代码
              // use: 'babel-loader',
              // 下面是正确配置插件方式 配置单独的加载器去实现
              use: {
                loader: 'babel-loader',
                options: ['@babel/preset-env']
              }
            }
          ]
        }
      }
    ```

#### &#x1F4DA; Webpack 加载资源的方式
  - 除了import能触发文件的加载 还有别的也可以触发加载文件
    - 遵循 ESModules 标准的 import 声明
    - 遵循 CommonJS 标准的 require 声明
    - 遵循 AMD 标准的 define 函数和 require 声明
      - 但是不要在一个项目中混入不同的标准
    - 样式代码中 @import 和 ulr()
    - html 代码中的图片标签和scr属性
    - 最后将用到的文件打包到输出目录

  - loader加载非js 也会触发资源加载
    - @import @import url()
    - url 函数 background-image: url();
    - src 属性 html 的 img 也会触发文件资源加载
    - a href  webpack 默认只处理HTML中的src属性 不会处理href想要处理需要配置html-loader

  - html-loader
    - npm install html-loader -d
    ```js
      module.exports = {
        mode: 'none',
        entry: '',
        output: {
          filename: '',
          path: '',
          publicPath: ''
        },
        module: {
          rules: [
            {
              test: /.html$/,
              use: {
                loader: 'html-loader',
                options: {
                  // 'img:src' 是默认就存在的   默认处理img加载的文件  
                  // 如果需要加载 a 标签 href加载的文件 我们需要告诉html-loader 去处理这样的文件
                  attrs: ['img:src', 'a:href']
                }
              }
            }
          ]
        }
      }
    ```
#### &#x1F4DA; Webpack 核心工作原理
  - loader 机制是webpack的核心
  - ![Image text](../image/image-08.jpg)

#### &#x1F4DA; Webpack 开发一个 Loader
  - 开发一个处理md文件的loader
  - loader要求我们对输入的文件进行处理
  - 处理结果必须是一段js代码
  - webpack.config.js 中使用自己定义的loader
  - ![Image text](../image/image-09.jpg)
  - 我们可以使用多个loader(加载器去处理 只要最后返回js就OK)
  - ![Image text](../image/image-10.jpg)
  - loader就是负责资源文件从输入到输出的转换
  - 先用marked-loader 处理 md 转换为 HTML 
    - 可以使用json.stringify将HTML转义(json 会将符号等一些转义)之后导出
    - 可以使用别得loader处理  使用html-loader 
    - 但是要注意loader执行顺序  先是marked-loader处理 之后是html-loader处理


#### &#x1F4DA; Webpack 插件机制介绍
  - loader 解决项目资源加载的问题
  - plugin 增强项目自动化的能力
    - 自动在打包之前清除上一次打包结果
    - 拷贝不需要处理的文件
    - 压缩
  
#### &#x1F4DA; Webpack 自动清除输出目录插件
  - clean-webpack-plugin
    ```js
      const path = require('path')
      const { CleanWebpackPlugin } = require('clean-webpack-plugin')

      module.exports = {
        mode: 'none',
        entry: './src/main.js',
        output: {
          filename: 'bundle.js',
          path: path.join(__dirname, 'temp'),
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
          // 经过测试   会默认删除output配置的打包目录
          new CleanWebpackPlugin()
        ]
      }
    ```

#### &#x1F4DA; Webpack 自动生成HTML插件（上）
  ```js
    const path = require('path')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    // 可以使用这个插件  直接再dist默认生成一个引用了打包入口文件的HTML
    const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        new HtmlWebpackPlugin()
      ]
    }

  ```

#### &#x1F4DA; Webpack 自动生成HTML插件（中）
  - 可以通过这个插件给生成的HTML设置一些传入HTML
  - 如果需要大量自定义的配置 还是去编辑一个HTML模板
  ```js
    const path = require('path')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    const path = require('path')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        new HtmlWebpackPlugin({
          title: 'Webpack Plugins Sample',
          meta: {
            viewprot: 'width=device-width'
          },
          // 定义模板文件路径 HTML模板中可以使用<%= htmlWebpackPlugin.options.title %> 去或得一些数据
          template: './src/index.html'
        })
      ]
    }

  ```
  ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Webpack Plugins Sample</title>
      <meta name="viewprot" content="width=device-width"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body>
        <div class="box-wrapper">
          <%= htmlWebpackPlugin.options.title %>
        </div>
      <script src="bundle.js"></script></body>
    </html>
  ```

#### &#x1F4DA; Webpack 自动生成HTML插件（下）
  - 默认创建的HTML是index.html
  - 多页面创建多个html 
    ```js
      const path = require('path')
      const { CleanWebpackPlugin } = require('clean-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')

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
          })
        ]
      }

    ```

#### &#x1F4DA; Webpack 插件使用总结
  - 对于一些公共的文件我们直接可以复制到dist文件中
  - copy-webpack-plugin
    ```js
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

    ```
#### &#x1F4DA; Webpack 开发一个插件
  - webpack是内置各种钩子函数的 在钩子函数中处理数据
    - 必须是一个函数 包含apply方法的对象
    - 一般定义一个类
  - 实现
    ```js
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
    ```

#### &#x1F4DA; Webpack 开发体验问题
  - 目前我们的学习远远不够
  - 将来要做什么
    - 能够使用HTTP服务去运行  更大程度的模拟生产环境
    - 自动编译  自动刷新  热更新
    - 提供Source Map支持 根据提供的错误堆栈信息去定义源码的错误

#### &#x1F4DA; Webpack 自动编译
  - watch工作模式
  - 监听文件变化，自动打包
  - webpack --watch
  - 就会以监视模式工作 打包之cli不会退出 等待文件的修改 当文件修改之后 cli再次处理

#### &#x1F4DA; Webpack 自动刷新浏览器
  - BrowserSync
  - 全局安装
  - 在dist文件下启动服务 监视dist文件下的文件改变
  - browser-sync dist --files "**/*"
  - 弊端
    - 操作麻烦
    - 效率降低 webpack写入磁盘 BrowserSync再去磁盘读取

#### &#x1F4DA; Webpack Dev Server
  - 是官方提出的开发工具
  - 自动编译  自动刷新  自动监听
  - npm install webpack-dev-server
  - 启动 webpack-dev-server
  - 并不会将打包结果输出  而是存放到内存当中  减少大量内存开销
  - webpack-dev-serve --open 自动打开浏览器

#### &#x1F4DA; Webpack Dev Server 静态资源访问
  - 其他静态资源也需要加载
    ```js
      devServer: {
        // 指定公共目录  配置公共资源  额外的资源路径
        contentBase: './image'
      }
    ```

#### &#x1F4DA; Webpack Dev Server 代理 API
  ```js
    // 如果没写module.exports = {}  说明这个对象是直接在最外面的属性 就和entry一样
    devServer: {
      // 指定公共目录  配置公共资源  额外的资源路径
      contentBase: './image',
      proxy: {
        // http://locahost:8080/api/user   -> https://api.github.com/api/user
        '/api': {
          target: 'https://api.github.com',
          // https://api.github.com/api/user   ->  https://api.github.com/user
          pathRewrite: {
            '^/api': ''
          },
          // 不能使用  locahost:8080 作为主机名 github服务器会对主机名解析  true就会以实际代理的主机名请求
          changeOrigin: true
        }
      }
    }
  ```
#### &#x1F4DA; Source Map 介绍
  - 打包之后的代码和源代码的映射
  - 打包之后的代码通过SourceMap可以逆向解析源代码
  - map文件构成
    - version 当前sourceMap使用的版本
    - sources 源文件的文件名
    - names 源代码中使用的变量名称
    - mappings base64-vlq编码   记录的是转换后的字符和转换之前代码的关系
  - 使用
    - 在转换之后的文件中通过注释引入
    - //# sourceMappingURL=xxxxx.min.map
    - 浏览器会自动加载逆向解析

#### &#x1F4DA; Webpack 配置 Source Map
  - sourceMap 有很多模式 
  - devtool
    ```js
      // 如果没写module.exports = {}  说明这个对象是直接在最外面的属性 就和entry一样
      devtool: 'source-map'
    ```
  - webpack支持12种 不同的 SourceMap 生成
  - 每种方式的效果和效率不同
  - 找错效率越高的  map 文件速度就越慢  找错效率高说明定位准确 所以要生成准确的map文件  所以慢
#### &#x1F4DA; Webpack eval 模式的 Source Map
  - ![Image text](../image/image-11.jpg)
  - eval模式
    - eval是一个js的函数
    - eval('console.log(1)') 他会把传入的字符串当做一段代码执行
  - 实现
    - devtool: 'eval'
    - map映射的是打包之后的模块化代码
    - 因为在打包之后会将我们的源码放在eval函数中执行 并且在eval函数最后通过 sourceURL的方式添加了map文件映射
    - sourceURL的方式添加了map文件映射  而这个映射会告诉浏览器我们映射的源文件 
    - 这个过程不会生成SourceMap文件  所以构建速度是最快的
    
#### &#x1F4DA; Webpack devtool 模式对比（上）
  - webpack 可以配置多个打包任务 这样就可以一次配置多个任务去进行不同的sourceMap生成 去查看对比
    ```js
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const path = require('path')
      const devtool = [ 'source-map', 'eval' ]
      moudle.exports = devtool.map(item => {
        return {
          mode: 'none',
          entry: './src/main.js',
          output: {
            // 将生成的文件都放到js文件下
            filename: `js/${item}.js`,
            path: path.join(__dirname, 'dist'),
          },
          // 循环定义每一种sourceMap
          devtool: item,
          module: {
            rules: [
              {
                // 使用babel/preset-env去将代码转换  使其和源码不同
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            ]
          },
          // 给每一个js文件都生成一个HTML文件 这样就能在页面中直接运行
          plugins: [
            new HtmlWebpackPlugin({
              filename: `${item}.html`
            })
          ]
        }
      })
    ```
  - 之后利用  serve  工具将起一个服务

#### &#x1F4DA; Webpack devtool 模式对比（下）
  - 看每一个模式的名字 
    - cheap 阉割版
    - module 定位的是模块打包之前的代码 也就是和你写的ES6+ 代码一样的

  - eval 模式
    - 把代码放到eval函数中执行  并且通过sourceURL去标注文件的路径
    - 这种模式并没有生成sourceMap 文件 这个模式只能标注哪个文件出错
  
  - eval-source-map
    - 同样是使用eval函数将模块代码放入执行
    - 但是可以定位文件出错的位置
    - 生成了sourceMap
  
  - cheap-eval-source-map
    - 是 eval-source-map 的阉割版
    - 也生成了sourcemap 
    - 但是只能定位到哪一行出错 速度也会快很多

  - cheap-module-eval-source-map
    - 也是只能定位到行
    - 但是和cheap-eval-source-map对比之后发现 
    - cheap-module-eval-source-map 定义的代码位置是和源码一模一样的
    - cheap-eval-source-map 定义的是经过ES6转化之后的结果

  - inline-source-map
    - sourcemap是以物理文件存在的
    - 使用data:url的方式嵌入到代码当中
    - 这样会使代码体积变大

  - hidden-source-map
    - 在开发工具是看不到效果的
    - 但是本地生成了sourceMap
    - 是因为打包之后的文件并没有使用注释的方式引入sourceMap
    - 一般在使用第三方包的时候使用 当第三方包出问题之后引入去定位错误
  
  - nosources-source-map
    - 在浏览器能看到错误出现的位置 但是点击错误信息是看不到源码
    - 并且可以提示错误出现的行列
    - 为了能在生产环境保护源码不被暴露

  - 选择一个合适的sourceMap
#### &#x1F4DA; Webpack 选择 Source Map 模式
  - 开发环境
    - cheap-module-source-map
      - 能定位到行的错误信息就够了
      - 因为使用框架的原因 转换之后的代码和转换之前的代码差距很大  所以需要module去定位错误发生的位置
      - 首次打包速度慢可以接受 重写打包速度快
  
  - 生产环境
    - none
      - 不生成sourceMap
      - 容易暴露源码
  
  - 尽量在开发阶段解决问题和bug

#### &#x1F4DA; Webpack 自动刷新的问题
  - webpack-dev-server
    - 可以检测到代码的变化 刷新
  - 问题
    - 表单等一些输入调试的在刷新的时候没了
  - 最好的办法就是页面不刷新但是更新模块

#### &#x1F4DA; Webpack HMR 体验
  - 热更新(最强大  最受欢迎)
    - 可以在机器上插拔设备 但是不影响极其正常使用
    - 可以在程序运行中改变指定模块 而不影响其他模块

#### &#x1F4DA; Webpack 开启 HMR
  - 集成在webpakc-dev-server
  - 开启
    - webpack-dev-server --hot 启动热更新
    - 也可以在配置文件中配置
      ```js
        // 但是这样开启之后 css是热更新的  js还是刷新页面更新的 所以这里还是有问题的
        devServer: {
          hot: true
        }
      ```

#### &#x1F4DA; Webpack HMR 的疑问
  - 并不是开箱即用
  - webpack中的HMR 需要手动处理模块热替换逻辑
  - 样式文件的HMR是style-loader处理的 
  - 所以我们还是需要手动自己处理HMR

#### &#x1F4DA; Webpack 使用 HMR API
  - 我们需要在自己的代码中使用 HMR API 处理 
    ```js
      import md from './a.md'
      console.log(md)
      // 依赖的模块的路径  模块改变的回调
      module.hot.accept('./a', function() {
        // 这时候我们修改 a.md 的时候这个回调就会被触发 然后浏览器也不会刷新 因为我们在这里将模块的更新手动处理了
        // 反之如果我们没有处理  还是会像之前一样浏览器刷新
        console.log('a更新了')
      })
    ```
#### &#x1F4DA; Webpack 生产环境优化
  - 不同的生产环境去创建不同的配置
  - 让我们的打包结果去适用不同的结果

#### &#x1F4DA; Webpack 不同环境下的配置
  - 配置文件根据环境不同导出不同配置
    ```js
      // env当前运行环境变量
      // argv 所有环境变量
      module.exports = (env, argv) => {
        const config = {}  // production 生产环境webpack配置  这里就不写了 
        if (env === 'production') {
          // 打包模式
          config.mode = 'production'
          // 是否启用SourceMap
          config.devtool = false
          config.plugins = [
            // 将之前的插件解构合并过来
            ...config.plugins,
            // 清除上次打包结果
            new CleanWebpackPlugin(),
            // copy公共资源到dist
            new CopyWebpackPlugin(['public'])
          ]
        }
        return config
      }
      // webpack --env production
    ```
#### &#x1F4DA; Webpack 不同环境的配置文件
  - 一个环境对应一个配置文件
  - 一般有三个配置环境文件 两个是不同的环境配置文件  一个是公共的webpack配置
  - 创建3个配置文件
    - webpack.common.js
      ```txt
        同下
      ```
    - webpack.dev.js
      ```txt
        同下
      ```
    - webpack.prod.js
      ```js
        const common = require('./webpack.common.js')
        const { CleanWebpackPlugin } = require('clean-webpack-plugin')
        const CopyWebpackPlugin = require('copy-webpack-plugin')
        // assign这个方法会合并 但是引用类型的会直接替换  不会合并  所以这里我们使用webpack-merge
        // module.exports = Object.assign({}, common, {
        //   mode: 'production',
        //   plugins: [
        //     // 因为是生产环境  所以这里需要清除上次打包结果和拷贝公共文件
        //     new CleanWebpackPlugin(),
        //     // copy公共资源到dist
        //     new CopyWebpackPlugin(['public'])
        //   ]
        // })
        const merge = require('webpack-merge')
        module.exports = merge(common, {
          mode: 'production',
          plugins: [
            // 因为是生产环境  所以这里需要清除上次打包结果和拷贝公共文件
            new CleanWebpackPlugin(),
            // copy公共资源到dist
            new CopyWebpackPlugin(['public'])
          ]
        })
      // webpack --config webpack.prod.js
      ```
      
#### &#x1F4DA; Webpack DefinePlugin
  - 为代码注入全局成员
  - 默认启用
  - 注入一个process.env.NODE_ENV
    ```js
      const webpack = requrie('webpack')
      module.exports = {
        plugins: [
          new webpack.DefinePlugin({
            BASE_API: "'https://baidu.com'"
          })
        ]
      }
      // BASE_API实际上是一个代码片段 
      // 上面如果不加字符串  就是 一个 未定义的变量  加了字符串符号就是字符串
      // 这样就可以在文件中直接使用  BASE_API  这个变量了  
      // 这样就可以注入一些可以变化的值
    ```

#### &#x1F4DA; Webpack 体验 Tree Shaking
  - 摇树
    - 把树上的枯枝败叶摇下来
  - 而这里我们摇掉的是代码中没有用到东西(未引用代码)
  - 生产模式下自动启用

#### &#x1F4DA; Webpack 使用 Tree Shaking
  - 不是某个配置选项
  - 是一组功能搭配后的优化效果
  - 生产环境会默认启动
    ```js
      module.exports = {
        // 集中配置webpack内部的一些优化功能的
        optimization: {
          usedExports: true, // 标识我们只导出代码中外部使用的   大树中标识未引用的代码
          miniize: true, // 代码压缩                           摇掉这些冗余代码
        }
      }
    ```

#### &#x1F4DA; Webpack 合并模块
  - concatenateModules 可以继续优化我们的输出
  - 尽可能将所有的模块合并输出到一个函数中 既提升了运行效率，又减少了代码的体积
  - 又被称为 Scope Hoisting  作用域提升
    ```js
      module.exports = {
        // 集中配置webpack内部的一些优化功能的
        optimization: {
          usedExports: true, // 标识我们只导出代码中外部使用的   大树中标识未引用的代码
          concatenateModules: true
        }
      }
    ```

#### &#x1F4DA; Webpack Tree Shaking 与 Babel
  - 使用 Babel 会使 Webpack Tree Shaking 失效
  - Webpack Tree Shaking 的实现 前提是 ESModules 也就是webpack打包的代码必须使用ESModules
  - 而 babel-loader 处理 ESModules  就会处理成CommonJS 当然 这取决于我们有没有使用 babel-loader
  - 而最新版本的 babel-loader 支持 ESModules  也就是ESModules不会被处理成 CommonJS  这样我们的 Tree Shaking就会生效
    ```js
      module.exports = {
        module: {
          rules: [
            {
              test: /.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    // 默认为 false  会根据当前环境去处理打包模块化
                    // 这里我们给 @babel/preset-env 这个打包工具设置模块打包类型为 commonjs 强制将 ESModules 转换为 commonjs  此时 Tree Shaking 就无法正常工作了
                    ['@babel/preset-env', { modules: 'commonjs' /* false */ }]
                  ]
                }
              }
            }
          ]
        }
      }
    ```
#### &#x1F4DA; Webpack sideEffects
  - v4 以后增加
  - 标识代码是否有副作用
  - 模块执行的时候除了导出成员 是否还做了其他事情
  - 一般在 开发 npm 模块的时候会用到
    ```js
      module.exports = {
        // 依次判断模块去除时候是否有副作用  如果没有副作用就会被去除
        // 默认在 生产环境中开启
        // 开启之后会先去package中判断 是否 有 sideEffects的标识
        // 开启这个功能   package中去清除掉没有副作用的代码
        sideEffects: true
      }
    ```
  - 这样没有副作用的代码就会被移除掉
    ```json
      {
        "sideEffects": false
      }
    ```
#### &#x1F4DA; Webpack sideEffects 注意
  - 确定你的代码没有副作用  不然会误删
  - css导入  或者 基于原型的方法  有些代码只是想让他执行  但是并没有导出对象  这种时候代码会被移除掉
  - 解决办法
    - package 中关掉
    - 设置当前项目中那些文件是有副作用的  设置告诉webpack有副作用的代码   这样代码就会被打包进来了
      ```js
      module.exports = {
        // 依次判断模块去除时候是否有副作用  如果没有副作用就会被去除
        // 默认在 生产环境中开启
        // 开启之后会先去package中判断 是否 有 sideEffects的标识
        // 开启这个功能   package中去清除掉没有副作用的代码
        sideEffects: [
          './src/extend.js',
          '*/*.css'
        ]
      }
    ```

#### &#x1F4DA; Webpack 代码分割(code Splitting)
  - webpack打包之后项目中所有的代码都会被打包到一起
  - 但是在应用开始运行的时候并不是所有的模块都在执行
  - 所以我们需要把我们的打包结果  按照一定规则分离 根据运行需要按需加载
  - 大量的请求会造成资源浪费
  - 两种分包方式
    - 多入口打包
    - export 动态导入

#### &#x1F4DA; Webpack 多入口打包
  - 最常见的划分规则就是
    - 一个页面对应一个打包入口
    - 不同页面公共的部分再去单独提取
  - 实现多入口打包
    ```js
      // 给每一个js生成一个HTML文件 自动注入所有打包结果
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      module.exports = {
        // 如果入口定义成数组 那么webpack会认为你想将多个文件打包到一起 
        entry: {
          // 一个属性就是一个打包入口
          index: './src/index.js',
          album: './src/album.js'
        }，
        output: {
          // 多入口打包 就需要多出口啊  这里用[name]去动态将entry的key动态注入
          filename: '[name].bundle.js'
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/index.html',
            filename: 'index.html'
          }),
          new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/index.html',
            filename: 'album.html'
          })
        ]
      }
      // 上面这样打包之后可以发现 每一个HTML都是将所有的打包的js引入了  这样即使将js分开打包了  但是还是在同一个文件中一起引入了
      // 解决
      // 给 HtmlWebpackPlugin 添加配置项 chunks 指定当前HTML的使用的打包的js  也就是上面entry入口定义的
      module.exports = {
        // 如果入口定义成数组 那么webpack会认为你想将多个文件打包到一起 
        entry: {
          // 一个属性就是一个打包入口
          index: './src/index.js',
          album: './src/album.js'
        }，
        output: {
          // 多入口打包 就需要多出口啊  这里用[name]去动态将entry的key动态注入
          filename: '[name].bundle.js'
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
          }),
          new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/index.html',
            filename: 'album.html',
            chunks: ['album']
          })
        ]
      }
    ```

#### &#x1F4DA; Webpack 提取公共模块
  - 不同的入口一定会有公共的模块
  - 公共的模块提取到一个bundle中
    ```js
      module.exports = {
        optimization: {
          splitChunks: {
            // all表示我们会将所有的公共部分提取到一个bundle当中
            chunks: 'all'
          }
        }
      }
    ```

#### &#x1F4DA; Webpack 动态导入
  - 按需加载-动态导入-所有动态导入的模块都会自动分包
  - 实现
    ```js
      // 就是ESModule实现动态导入的方法
      import('./post/posts').then(arg => {
        console.log(arg)
      })
    ```

#### &#x1F4DA; Webpack 魔法注释
  - 默认动态导入的文件名称是一个序号
  - 如果需要给这些文件命名的话
  - 可以使用 魔法注释 的方式去实现
    ```js
      // 注释中的名字回作为打包文件的名字  post.bundle.js
      import(/* webpackChunkName: 'post' */'./post/posts').then(arg => {
        console.log(arg)
      })

      // del.bundle.js
      import(/* webpackChunkName: 'del' */'./post/del').then(arg => {
        console.log(arg)
      })

      // 如果 webpackChunkName 相同的话  那这两个动态引入的文件就会被打包到一个文件中 也就是相同name的那个文件中
    ```

#### &#x1F4DA; Webpack MiniCssExtractPlugin
  - 可以从css打包结果提取的插件
  - css的按需加载
  - npm install MiniCssExtractPlugin -d
    ```js
      const MiniCssExtractPlugin = require('MiniCssExtractPlugin')
      module.exports = {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                // 'style-loader',  // 将样式使用style 标签去注入到HTML中 而 MiniCssExtractPlugin 是将css处理成一个单独的文件去单独使用link引入 所以这里就不需要style-loader
                MiniCssExtractPlugin.loader, // 取而代之我们使用MiniCssExtractPlugin提供的loader 去使用link
                // 当css 大于150K的时候 才考虑是否提取到单独的文件中
                'css-loader' // 处理样式
              ]
            }
          ]
        },
        plugins: [
          new MiniCssExtractPlugin()
        ]
      }
    ```
#### &#x1F4DA; Webpack OptimizeCssAssetsWebpackPlugin
  - css资源文件没有被压缩 因为webpack内置的压缩只压缩js代码
  - 这里我们使用 css 压缩的插件 optimize-css-assets-webpack-plugin
    ```js
      const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
      module.exports = {
        plugins: [
          new OptimizeCssAssetsWebpackPlugin()
        ]
      }
    ```
  - 但是我们在官方看到 OptimizeCssAssetsWebpackPlugin 是设置到 optimization中 因为一般代码压缩都是在生产环境中去打包的
  - 而 optimization 是生产环境默认启动的
    ```js
      // 当我们这里定义了 optimization 的时候  内置的js代码压缩器就会被覆盖 从而 js压缩器不执行
      // 所以我们这里需要在使用另一个js压缩器 压缩js代码
      // terser-webpack-plugin
      const TerserWebpackPlugin = require('terser-webpack-plugin')
      module.exports = {
        optimization: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
        ]
      }
    ```
#### &#x1F4DA; Webpack 输出文件名 Hash
