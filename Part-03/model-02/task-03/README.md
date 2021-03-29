## &#x1F964; task-01 Vue.js 源码剖析-模板编译和组件化

### &#x1F4DA; 1. 模板编译过程
  - [入口 `compileToFunctions`](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/platforms/web/compiler/index.js)

  - [createCompilerCreator 是在这里调用的 调用的时候把 baseCompile传入](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/index.js#L15)
    - 将 baseCompile 传入
    - [声明并返回 createCompiler](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L9:3)

  - [createCompilerCreator 返回一个新函数 createCompiler](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L7:1)
    - [createCompiler 中 返回了 compile 和 compileToFunctions](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L72)

  - createCompiler
    - [createCompiler](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/index.js#L15:8)
    - [createCompiler 返回了 compile 和 compileToFunctions](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L74:7)  
    - [createCompiler 内部 声明 compile](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L10) 
      - compile 合并 options 
      - 调用在 createCompilerCreator 传入的 baseCompile
  - [baseCompile](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/index.js#L20)
    - parse 标记 AST 抽象语法树
    - optimize
      - 标记AST(抽象语法树)中的静态根节点
      - 监测静态子树 设置为静态 装不需要再每次渲染重新生成节点
      - patch 的过程中跳过静态根节点
    - generate 将优化过的AST转换成字符串形式的js代码
  - [compileToFunctions 调用 createCompileToFunctionFn](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/create-compiler.js#L74)
    - [createCompileToFunctionFn 返回 compileToFunctions](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/to-function.js#L24)
    - [compileToFunctions 最后调用 compile](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/to-function.js#L60)
      - [将上一步生成的字符串形式js代码转换为函数 调用createFunction](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/to-function.js#L93)
    - [createFunction 将生成 render 函数 挂载到Vue实例的options对应的属性上](https://sourcegraph.com/github.com/GGupzHH/vue/-/blob/src/compiler/to-function.js#L93)

### &#x1F4DA; 1. compileToFunctions
  - 调用 createCompileToFunctionFn
  - createCompileToFunctionFn
    - 调用 compile 获取合并后的 模板
  - 调用 createFunction 生成 render 和 staticRenderFns

### &#x1F4DA; 2. compile
  - compile 是 createCompiler 中创建的  并且是 createCompiler 的返回值
  - 合并用户传入的 options
  - compile 定义
  - 合并完成之后调用 baseCompile

### &#x1F4DA; 3. baseCompile
  - parse 标记 AST 抽象语法树
  - optimize
    - 标记AST(抽象语法树)中的静态根节点
    - 监测静态子树 设置为静态 装不需要再每次渲染重新生成节点
    - patch 的过程中跳过静态根节点
  - generate 将优化过的AST转换成字符串形式的js代码

