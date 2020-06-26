# &#x1F39F; Part-01 JavaScript 深度剖析

## &#x1F6A9; model-01 函数式编程与JS异步编程、手写Promise

### &#x1F4DA; 函数式编程 (Function Programming FP)

- 面向对象编程的思维方式
  ```txt
    把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承、多态来演示事物事件的联系。
  ```
- 函数式编程
  ```txt
    函数式编程就是用来描述数据(函数)之间的映射
  ```

### &#x1F4DA; 函数是一等公民 MDN(First-Class Function) 高阶函数(Higher-order Function)
  - 特点
    - 函数可以存储在变量中 （函数表达式）
      ```js
        // 把函数赋值给变量
        let fn = function() {
          console.log("Hello First-Class Function")
        }
      ```
      ```js
        const BlogCentent = {
          index (posts) { return View.index(posts) },
          show (posts) { return View.show(posts) },
          create (posts) { return View.create(posts) }
        }

        // 优化  函数在调用的时候直接传入参数
        const BlogCentent = {
          index: View.index,
          show: View.show,
          create: View.create
        }
      ```
    - 函数可以作为参数 传入 (Part-01/model-01/higher-order-function.js)
      ```js
        // forEach
        function forEach(arr, fn) {
          for (let i = 0; i < arr.length; i++) {
            fn(arr[i], i)
          }
        }

        // fliter
        function filter(arr, fn) {
          let result = []
          for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i)) {
              result.push(arr[i])
            }
          }
          return result
        }
        // 总结 函数作为参数传入的好处
        //   1. 灵活 函数内部的执行条件/逻辑  是可以随着调用时改变的
      ```
    - 函数可以作为返回值
      ```js
        // 两种调用方式 
        function makeFn() {
          let result = 'Hello Higher Order Function'
          return function () {
            console.log(result)
          }
        }

        const fn = makeFn()
        fn()

        makeFn()()

        // 控制函数只能执行一次
        // once function 对传入函数只执行一次
        function once(fn) {
          let done = true
          return function (str) {
            if (done) {
              done = false
              fn.apply(this, arguments)
            }
          }
        }

        let conStr = once(function (str) {
          console.log(str)
        })

        conStr('已经执行')
        conStr('还可以再次执行吗')

        // 如上逻辑再加上定时器配合 可以作为一个防抖函数来执行
        // 上面的逻辑稍加改造成一个防抖函数
        function debounce(fn) {
          let result = true
          return function(str) {
            if (result) {
              result = false
              fn.apply(this, arguments)
              setTimeout(() => {
                result = true
              }, 500);
            }
          }
        }
        let conStr = debounce(function (str) {
          console.log(str)
        })

        conStr('执行')
        conStr('执行')
        conStr('执行')
        conStr('执行')
        conStr('执行')
        setTimeout(() => {
          conStr('执行')
        }, 500);
      ```
  - 意义
    ```txt
      能让函数更灵活
      抽象可以帮助我们屏蔽细节， 只关注最后的结果
    ```

### &#x1F4DA; 闭包(Closure)
  - 定义 
    ```txt
    一个函数返回一个新的函数 并且返回的函数和当前词法作用域引用捆绑在一起形成闭包
    ```
  - 案例
    ```js
      // 利用闭包暂存次幂

      function makePower(power) {
        return function(number) {
          return Math.pow(number, power)
        }
      }

      const makePower2 = makePower(2)
      const makePower3 = makePower(3)

      console.log(makePower2(3))
    ```

### &#x1F4DA; 纯函数
  - 概念
    - 相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
    ```
      类似数学中的函数(用来描述输入和输出的关系)
      函数式编程中函数中的变量是无状态的
      我们可以把结果交给另一个函数处理
    ```

### &#x1F4DA; [Lodash](https://www.lodashjs.com)
  - lodash是什么
    ```txt
      是一个一致性、模块化、高性能的 JavaScript 实用工具库。
      提供了各种Array Object等一些封装好的方法
    ```

### &#x1F4DA; 纯函数
  - 可缓存 
    ```txt
      因为纯函数相同的输入有相同的输出  所以可以把结果缓存下来 多次使用
    ```
    - lodash 的 memoize可以对纯函数实线缓存
    ```js
      const _ = require('lodash')

      function getArea(r) {
        console.log(r)
        return Math.PI * r * r
      }

      let getAreaWithMemory = _.memoize(getArea)
      console.log(getAreaWithMemory(4))
      console.log(getAreaWithMemory(4))
      console.log(getAreaWithMemory(4))
      console.log(getAreaWithMemory(5))
      console.log(getAreaWithMemory(5))
    ```
    - 自己实现一个memoize
      ```js
        function memoize(f) {
          let cache = {}
          return function() {
            let key = JSON.stringify(arguments)
            cache[key] = cache[key] || f.apply(f, arguments)
            return cache[key]
          }
        }

        let getAreaWithMemory = memoize(getArea)
        console.log(getAreaWithMemory(4))
        console.log(getAreaWithMemory(4))
        console.log(getAreaWithMemory(4))
        console.log(getAreaWithMemory(5))
        console.log(getAreaWithMemory(5))
      ```
  - 便于测试
    ```txt
     所有的纯函数在相同的输入会有相同的输出
    ```
  - 并行处理
    ```txt
      多线程操作全局变量时候，可能会造成共享变量被修改
      而纯函数不需要访问共享的内存数据，所以纯函数可以在并行环境下任意运行( webwork )
    ```
  - 副作用
    ```js
      // 不纯函数  因为函数输出的结果会和外部定义的mini变量有关系
      let mini = 18
      function checkAge(age) {
        return age > mini
      }

      // 纯函数(有硬编码 后续可以通过柯里化解决)
      function checkAge(age) {
        let mini = 18
        return age > mini
      }
    ```
    - 副作用来源
      ```txt
        配置文件...
      ```

### &#x1F4DA; 柯里化(Haskell Brooks Curry)
  - 定义
    ```txt
      当一个函数需要多个参数的时候， 我们可以调用一个函数只传入部分的参数(这部分参数以后永远不会变)，这个函数返回一个新的函数， 这个新的函数去接收剩余的参数， 并返回最终结果 
    ```
  - _.curry(func) lodash 中的函数通用柯里化方法
    - 功能
      ```txt
        创建一个函数，该函数接收一个或多个func的参数， 如果func所需要的参数都被传入， 则执行func返回结果。否则继续返回该函数并等待接收剩余参数
      ```
    - 参数
      ```txt
        需要柯里化的函数
      ```
    - 返回值
      ```txt
        柯里化后的函数
      ```
  - 总结
    - 柯里化可以让我们给一个函数传入较少的参数得到一个已经记住传入参数的新函数
    - 这是一种对函数参数的'缓存(闭包)'
    - 让函数更灵活， 粒度更小
    - 可以把多元函数(多个参数)转换为一元函数(一个参数)， 组合使用产生强大的功能


## &#x1F6A9; model-02 ES 新特性与 TypeScript、JS 性能优化
