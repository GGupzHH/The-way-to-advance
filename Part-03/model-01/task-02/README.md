## &#x1F964; task-02 Vue-Router 原理实现

### &#x1F4DA; 课程介绍
  - VueRouter 基础回顾
  - Hash模式和History模式
  - 模拟实现自己的VueRouter

### &#x1F4DA; Vue Router 基础回顾-使用步骤
  - 在new Vue时候挂载router的作用
    ```js
      import Vue from 'vue'
      import App from './App.vue'
      import router from './router'

      Vue.config.productionTip = false

      new Vue({
        // 3. 注册 router 对象
        // 如果不注册在vue实例就没有 route(当前路由的信息) 和 router对象(router 实例)(currentRoute当前路由规则)  
        router,
        render: h => h(App)
      }).$mount('#app')
    ```

### &#x1F4DA; 动态路由
  
### &#x1F4DA; 嵌套路由
### &#x1F4DA; 编程式导航
### &#x1F4DA; Hash 模式和 History 模式的区别
### &#x1F4DA; History 模式
### &#x1F4DA; History 模式 - Node.js
### &#x1F4DA; History 模式 - nginx.