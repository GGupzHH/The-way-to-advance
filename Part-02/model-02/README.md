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
