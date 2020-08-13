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
    ```txt
      1、老节点不存在，直接添加新节点到父元素
      2、新节点不存，从父元素删除老节点。
      3、新老节点都存在
        3.1 判断是否是相同节点（根据key、tag、isComment、data同时定义或不定义）
          - 相同则直接返回
          - 不是相同节点
            如果新老节点都是静态的，且key相同。从老节点拿过来，跳过比对的过程。
            如果新节点是文本节点，设置节点的text
            新节点不是文本节点
            新老节点子节点都存在且不同，使用updateChildren函数来更新子节点
            只有新节点字节点存在，如果老节点子节点是文本节点，删除老节点的文本，将新节点子节点插入
            只有老节点存在子节点，删除老节点的子节点
      3.2 updateChildren
        给新老节点定义开始、结束索引
        循环比对新节点开始VS老节点开始、新节点结束VS老节点结束、新节点开始VS老节点结束、新节点结束VS老节点开始并移动对应的索引，向中间靠拢
        根据新节点的key在老节点中查找，没有找到则创建新节点。
        循环结束后，如果老节点有多的，则删除。如果新节点有多的，则添加。
    ```
- 二 编程
  - 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
  
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
      ```js
        // compiler 判断当前指令是否在存在 v- 的情况下 是否存在 : 存在则获取事件类型和事件处理函数
        attrName = 'on:click'
        if (attrName.split(':').length > 1) {
          this.eventUpdater(node, key, attrName, attrName.split(':')[1])
        }

        // v-on:event 实现
        eventUpdater(node, value, key, event) {
          node.addEventListener(event, this.vm.$options.methods[value])
        }
      ```
  - 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：
