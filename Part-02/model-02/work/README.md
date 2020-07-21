### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
  - 构建流程
    - 初始化项目
    - 配置webpack.config.js
    - 配置不同参数(入口、出口文件、开发模式、需要的loader、plugin等)
    - 执行打包命令

  - 根据配置文件入口找到项目依赖资源
  - 根据loader解析不同的资源
  - 通过plugin处理打包过程中其余的问题
  - 输出打包结果
  

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
  - Loader
    ```txt
      loader是描述了webpack如何处理非js模块，并且在不了的中引入这些依赖。
      loader可以将文件从不同的语言转换为js， 或者将内联图像转换为dataURL
    ```
  - 开发Loader
    - 通过module.exports导出一个函数
    - 该函数默认接收一个默认参数source(要处理的资源文件)
    - 在函数中处理资源文件内容(该函数中可以使用其他loader去处理)
    - 最后返回以字符串处理的之后的结果

  - Plugin
    ```txt
      Plugin 解决loader无法实现的其他事情，从打包优化到压缩代码，定义环境变量等，功能多种多样
    ```

  - 开发Plugin
    - 通过在webpack内置的钩子函数中挂载
    - 插件必须是一个函数或方法并且有apply方法
    - apply方法接收一个默认参数 compiler (webpackAPI) 该API有webpack提供的多种获取资源文件的方法
    - 处理之后再通过webpack提供的API返回
