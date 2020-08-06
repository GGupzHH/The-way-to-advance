## &#x1F964; task-04 Virtual DOM 的实现原理

### &#x1F4DA; 课程目标
  - 了解什么是虚拟DOM 以及虚拟DOM的作用
  - Snabbdom 的基本使用
  - Snabbdom 的源码解析

### &#x1F4DA; 什么是虚拟DOM
  - Virtual DOM (虚拟DOM) 是有普通的js对象来描述 DOM 对象 因为不是真实的 DOM 对象 所以叫做 Virtual DOM
  - 可以使用 Virtual DOM 描述 真实的 DOM
    ```js
      {
        sel: 'div',
        data: {},
        children: undefined,
        elm: undefined,
        key: undefined
      }
    ```
  - 从上面的虚拟 DOM 可以看到 创建一个 虚拟DOM 成本要小很多 

### &#x1F4DA; 为什么使用虚拟DOM
   - 手动操作 DOM 比较麻烦， 还需要考虑浏览器的兼容性问题 虽然有jQuery等 简化了DOM操作 但是随着项目的复杂 DOM 的操作也越来越复杂
   - 为了简化 DOM 的复杂操作于是有了各种 MVVM 的框架 MVVM 框架解决了视图和状态的同步问题
   - 为了简化视图的操作我们可以视同模板引擎， 但是模板引擎没有根本解决跟踪状态变化的问题 于是有了 Virtual DOM 
   - Virtual DOM 的好处是当状态改变的时候不需要立即更新 DOM 只需要创建一个虚拟DOM树来描述 DOM， Virtual DOM 内部将搞清楚如何有效( diff )的更新DOM
   - Virtual DOM github的描述
    - 虚拟DOM 可以维护程序的状态 跟踪上一次的状态
    - 通过比较前后两次状态的差异更新真实的DOM