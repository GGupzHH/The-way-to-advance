## &#x1F964; task-03 模拟 Vue.js 响应式原理

### &#x1F4DA; 课程目标
  - 模拟一个最小版本的Vue
  - 响应式原理在面试的常问问题
  - 学习别人优秀的经验 转换成自己的经验
  - 实际项目中问题的原理层面的解决
    - 给Vue实例新增一个成员是否是响应式的
    - 给属性重新赋值成对象 是否是响应式的
  - 为学习Vue源码做铺垫

### &#x1F4DA; 数据驱动
  - 准备工作
    - 数据驱动
    - 响应式的核心原理
    - 发布订阅模式和观察者模式
  - 数据驱动
    - 数据响应式 双向绑定 数据驱动
    - 数据响应式
      - 数据模型仅仅是普通的js对象 而当我们修改数据得时候 视图会更新 避免了繁琐的DOM操作 提高开发效率
    - 双向绑定
      - 数据改变 视图改变  视图改变 数据也随之改变
      - 我们可以使用v-model在表单元素上创建双向数据绑定
    - 数据驱动是Vue最独特的特性之一
      - 开发过程中只需要关注数据本身 不需要关注数据是如何渲染到视图的 
      
### &#x1F4DA; 数据响应式核心原理-Vue2\
  - 兼容性IE8+(不包括IE8)
  - Object.defineProperty
    ```js
      // 模拟 Vue 中的 data 选项
      let data = {
        msg: 'hello'
      }

      // 模拟 Vue 的实例
      let vm = {}

      // 数据劫持：当访问或者设置 vm 中的成员的时候，做一些干预操作
      Object.defineProperty(vm, 'msg', {
        // 可枚举（可遍历）
        enumerable: true,
        // 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义）
        configurable: true,
        // 当获取值的时候执行
        get () {
          console.log('get: ', data.msg)
          return data.msg
        },
        // 当设置值的时候执行
        set (newValue) {
          console.log('set: ', newValue)
          if (newValue === data.msg) {
            return
          }
          data.msg = newValue
          // 数据更改，更新 DOM 的值
          document.querySelector('#app').textContent = data.msg
        }
      })
    ```
  - Object.defineProperty 监听对象多个属性
    ```js
      let data = {
        msg: 'hello',
        count: 10
      }

      // 模拟 Vue 的实例
      let vm = {}

      proxyData(data)

      function proxyData(data) {
        // 遍历 data 对象的所有属性
        Object.keys(data).forEach(key => {
          // 把 data 中的属性，转换成 vm 的 setter/setter
          Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get () {
              console.log('get: ', key, data[key])
              return data[key]
            },
            set (newValue) {
              console.log('set: ', key, newValue)
              if (newValue === data[key]) {
                return
              }
              data[key] = newValue
              // 数据更改，更新 DOM 的值
              document.querySelector('#app').textContent = data[key]
            }
          })
        })
      }
    ```

### &#x1F4DA; 数据响应式核心原理-Vue3
  - 直接监听对象 而非属性
  - IE 6 新增 IE不支持 性能由浏览器优化
  ```js
    // 模拟 Vue 中的 data 选项
    let data = {
      msg: 'hello',
      count: 0
    }

    // 模拟 Vue 实例
    let vm = new Proxy(data, {
      // 执行代理行为的函数
      // 当访问 vm 的成员会执行
      get (target, key) {
        console.log('get, key: ', key, target[key])
        return target[key]
      },
      // 当设置 vm 的成员会执行
      set (target, key, newValue) {
        console.log('set, key: ', key, newValue)
        if (target[key] === newValue) {
          return
        }
        target[key] = newValue
        document.querySelector('#app').textContent = target[key]
      }
    })

    // 测试
    vm.msg = 'Hello World'
    console.log(vm.msg)
  ```

### &#x1F4DA; 发布订阅模式(publish-subscribe-pattern)
  - 订阅者
  - 发布者
  - 信号中心
  ```js
    // 事件触发器
    class EventEmitter {
      constructor() {
        this.event_case = Object.create(null)
      }
      // 订阅通知
      $on(eventType, handler) {
        this.event_case[eventType] = this.event_case[eventType] || []
        this.event_case[eventType].push(handler)
      }
      // 发布通知
      $emit(eventType) {
        if (this.event_case[eventType]) {
          this.event_case[eventType].forEach(handler => {
            handler()
          })
        }
      }
    }

    // 测试
    let em = new EventEmitter()
    em.$on('click', () => {
      console.log('click1')
    })
    em.$on('click', () => {
      console.log('click2')
    })

    em.$emit('click')
  ```
### &#x1F4DA; 观察者模式