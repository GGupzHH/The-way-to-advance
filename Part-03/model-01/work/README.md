# work
- 一 简答
 - 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
    ```js
      let vm = new Vue({
        el: '#el'
        data: {
          o: 'object',
          dog: {}
        },
        method: {
          clickHandler () {
          // 该 name 属性是否是响应式的
          this.dog.name = 'Trump'
          }
        }
      })
    ```
    
  - 2、请简述 Diff 算法的执行过程

- 二 编程
  - 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
  - 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
  - 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：