# &#x1F39F; Part-1 JavaScript 深度剖析

## &#x1F6A9; model -1 函数式编程与JS异步编程、手写Promise

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