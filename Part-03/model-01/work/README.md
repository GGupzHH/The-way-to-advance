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
    - 答
      ```txt
        不是响应式数据 响应式数据是在Vue初始化的时候 利用Object.definePrototype()监听
        当修改数据的时候触发不同的处理函数

        设置成响应式数据
        1. 在Vue初始化的时候就设置name属性 因为在Vue初始化的时候就会遍历data传入的数据
        给并且给所有属性绑定对应的 getter setter 当给this.dog.name重新赋值的时候 会触发
        绑定的 setter setter内部去判断是否有改变  有改变就通知对应的处理函数
          let vm = new Vue({
            el: '#el'
            data: {
              o: 'object',
              dog: {
                name: ''
              }
            },
            method: {
              clickHandler () {
                // 该 name 属性是否是响应式的
                this.dog.name = 'Trump'
              }
            }
          })
        2. 使用 Vue.set(target, key, value) 时，target 为需要添加属性的对象，key 是要添加的属性名，value 为属性 key 对应的值
      ```
  - 2、请简述 Diff 算法的执行过程

- 二 编程
  - 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
    - ./01-VueRouter-hash
  - 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
    - v-html 实现函数
      ```js
        htmlUpdater(node, value, key) {
          node.innerHTML = value
          new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
          })
        }
      ```
    - v-on 实现函数
  - 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：
    - ./03-Snabbdom-demo