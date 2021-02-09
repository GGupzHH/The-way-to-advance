## &#x1F964; task-01 Vue.js 源码剖析-响应式原理

### &#x1F4DA; 1. 课程目标
  - vue的静态成员 和 实例成员的初始化过程
  - 首次渲染的过程
  - 数据响应式原理

### &#x1F4DA; 2. 准备工作-目录结构
  - src
    - compiler      编译相关
    - core          Vue 核心相关
    - platforms     平台相关代码
    - server        SSR 服务端渲染
    - sfc           .vue 文件编译为 js 对象
    - shared        公共的代码

### &#x1F4DA; 3. 准备工作-调试
  - 打包工具
    - Rollup
      - Vue.js 源码的打包工具使用的是 Rollup，比 Webpack 轻量
      - Webpack 把所有文件当做模块，Rollup 只处理 js 文件更适合在 Vue.js 这样的库中使用
      - Rollup 打包不会生成冗余的代码
    - 安装依赖
      - npm init
    - 设置 sourcemap
      - package.json 文件中的 dev 脚本中添加参数 --sourcemap
      - -w 监听文件变化实时打包
      - -c 配置文件
      - --sourcemap 是否开启 sourcemap
      - --environment 环境变量
        ```json
          {
            "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web- full-dev"
          }
        ```
    - npm run build 可以将不同的版本都打包
  - 调试
    - examples 的示例中引入的 vue.min.js 改为 vue.js
    - 打开 Chrome 的调试工具中的 source

### &#x1F4DA; 4. 准备工作-Vue的不同构建版本
  - dist\README.md
  - ![Image text](../../image/019.jpg)
  - 术语
    - 完整版：同时包含**编译器**和**运行时**的版本。
    - 编译器：用来将模板字符串(Template)编译成为 JavaScript 渲染函数的代码，体积大、效率低。
    - 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码，体积小、效率高。基本上就是除去编译器的代码
    - UMD：UMD 版本通用的模块版本，支持多种模块方式。 vue.js 默认文件就是运行时 + 编译器的UMD 版本
    - CommonJS(cjs)：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。
    - ES Module：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件，为现代打包工具提供的版本。
      - ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。
      - ES6 模块与 CommonJS 模块的差异
  - Runtime + Compiler vs. Runtime-only
    ```js
      // Compiler 
      // 需要编译器，把 template 转换成 render 函数 
      // const vm = new Vue({ 
      //   el: '#app', 
      //   template: '<h1>{{ msg }}</h1>', 
      //   data: { 
      //     msg: 'Hello Vue' 
      //   } 
      // })
      // Runtime 
      // 不需要编译器 
      const vm = new Vue({ 
        el: '#app', 
        render (h) { 
          return h('h1', this.msg) 
        },
        data: { msg: 'Hello Vue' } 
      })
    ```
  - 推荐使用运行时版本，因为运行时版本相比完整版体积要小大约 30%
  - 基于 Vue-CLI 创建的项目默认使用的是 vue.runtime.esm.js
    - 通过查看 webpack 的配置文件
      ```js
        vue inspect > output.js
      ```
    - 注意： *.vue 文件中的模板是在构建时预编译的，最终打包后的结果不需要编译器，只需要运行时版本即可
  - 获取Vue-cli 中 webpack 完整的配置
    - 在当前目录输入 vue inspect > output.js
    - 或者 vue ui 可以看到webpack的完整的配置

### &#x1F4DA; 5. Vue 首次渲染的过程
  - 首先进入的是`core/instance/index.js`
    - 定义了`Vue的构造函数` 在构造函数中调用了 `_init()` 方法
      - `init`方法
        1. 先是给Vue实例做了`标记`
          ```js
            // 当前标记是在observe(响应式处理)的时候 判断当前是不是Vue实例  如果是Vue实例 则不需要响应式处理
            vm._isVue = ture
          ```
        2. 判断当前Vue实例是不是组件 来合并 `options` 选项
          ```js
            if (options && options._isComponent) {
              // 如果是组件 则通过下面合并options选项
              initInternalComponent(vm, options)
            } else {
              // 如果不是组件 也就是当前是创建Vue实例 使用下面的方法合并options
              vm.$options = mergeOptions(
                // 和Vue构造函数中的options进行合并
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
              )
            }
          ```
        3. 判断当前的环境----如果是开发环境
          ```js
            initProxy(vm)
            // initProxy 实现
            // 先判断当前浏览器环境是否支持proxy对象
            // 支持   就创建一个Proxy实例 代理Vue实例
            // 不支持 直接把Vue实例设置给_readerProxy  vm._readerProxy = vm
            
          ```
        4. 判断当前的环境----如果是生产环境
          ```js
            vm._readerProxy = vm
          ```

  - 然后进入的是`core/index.js`
    - 之后调用了`initGlobalAPI()`方法 初始化了Vue的静态成员 
  - 之后进入的是`web/runtime/index.js`
    - 在这个文件中初始化了一些和平台相关的内容
    - 最后还挂载了 `__patch` 和 `$mount` 两个方法
  - 第四个文件是入口`web/entry-runtime-with-compiler.js`
    - 在这个文件中重写了`$mount`增加了编译功能 也就是把模板编译成reader函数