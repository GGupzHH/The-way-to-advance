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
  - 通过占位符  去匹配一个动态的路由
    ```js
      const routes = [
        {
          path: '/',
          name: 'Index',
          component: Index
        },
        {
          path: '/detail/:id',
          name: 'Detail',
          // 开启 props，会把 URL 中的参数传递给组件
          // 在组件中通过 props 来接收 URL 参数
          props: true,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
        }
      ]
    ```
  - 组件内部获取动态路由参数
    ```vue
      <template>
        <div>
          <!-- 方式1： 通过当前路由规则，获取数据 -->
          通过当前路由规则获取：{{ $route.params.id }}

          <br>
          <!-- 方式2：路由规则中开启 props 传参 -->
          通过开启 props 获取：{{ id }}
        </div>
      </template>

      <script>
        export default {
          name: 'Detail',
          props: ['id']
        }
      </script>

      <style>

      </style>
    ```

### &#x1F4DA; 嵌套路由
  ```js
    const routes = [
      {
        name: 'login',
        path: '/login',
        component: Login
      },
      // 嵌套路由
      {
        // 只要路由匹配到了  /   就会渲染Layout  然后Layout里面也有router-view 就会渲染内部路由
        path: '/',
        component: Layout,
        children: [
          {
            name: 'index',
            path: '',
            component: Index
          },
          {
            name: 'detail',
            path: 'detail/:id',
            props: true,
            component: () => import('@/views/Detail.vue')
          }
        ]
      }
    ]
  ```
### &#x1F4DA; 编程式导航
  ```vue
    <template>
      <div class="home">
        <div id="nav">
          <router-link to="/">Index</router-link>
        </div>
        <button @click="replace"> replace </button>

        <button @click="goDetail"> Detail </button>
      </div>
    </template>

    <script>
    export default {
      name: 'Index',
      methods: {
        // 我们可以长按浏览器后退按钮 看到路由历史
        replace () { 
          // 但是replace方法不会记录本次历史 他会替换当前历史
          this.$router.replace('/login')
        },
        goDetail () {
          // 会在浏览器后退按钮中可以看到历史记录
          this.$router.push({ name: 'Detail', params: { id: 1 } })
          this.$router.push({ path: '/', params: { id: 1 } })
        },
        go () {
          // -2 就是跳转到上上次
          this.$router.go(-2)
        }
      }
    }
    </script>
  ```

### &#x1F4DA; Hash 模式和 History 模式的区别
  - 都是客户端实现路由方式
    ```txt
      也就是客户端发生变化的时候不会向服务端发送请求 使用js实现 根据不同的路由实现不同的页面的替换
    ```
  - 表现形式的区别
    - Hash
      - hhtps://music.164.com/#/playle?id=110
      - 会携带# 
      - 参数在 ? 后面拼接
      - 很丑
    - History
      - hhtps://music.164.com/playle/110
      - 正常的URL
      - 需要服务端配合
  - 原理区别
    - Hash
      - 基于锚点 以及onhashChange事件 通过锚点的值 作为路由地址 当地址发生变的时候 触发onhashChange事件 之后根据路径决定页面的内容
    - History
      - 基于HTML5 的HistoryApi
        - history.pushState()  // IE10以后才支持 会向服务器发送请求
        - history.replaceState() // 不会向服务器发送请求 只会改变浏览器地址栏的地址 并且把这个地址记录到历史记录中 所以可以实现客户端路由

### &#x1F4DA; History 模式
  - 需要服务器的支持
  - /login 会发送请求  如果服务端不存在这样的请求就会返回404
  - 所以在服务端配置 除了静态资源都返回单页引用的index.html
  - 需要在创建路由的时候设定mode: 'history'

### &#x1F4DA; History 模式 - Node.js
  - 后端没有配置
    ```txt
      第一次打开页面的时候返回第一个路由 此时切换路由 页面都正常 因为此时处理URL改变的是history处理的  也就是js处理的  当我们在另一个路由刷新浏览器的时候 此时因为后端没有配置history模式  就是认为像一般发送ajax请求一样处理 返回一个找不到该请求
    ```
  - node 
    ```js
      const path = require('path')
      // 导入处理 history 模式的模块
      const history = require('connect-history-api-fallback')
      // 导入 express
      const express = require('express')

      const app = express()
      // 注册处理 history 模式的中间件
      app.use(history())
      // 处理静态资源的中间件，网站根目录 ../web
      app.use(express.static(path.join(__dirname, '../web')))

      // 开启服务器，端口是 3000
      app.listen(3000, () => {
        console.log('服务器开启，端口：3000')
      })
    ```

### &#x1F4DA; History 模式 - nginx. 
  - 在NGINX文件夹中conf中的nginx.conf 配置
    ```nginx
      http {
        server {
          #当我们在地址栏输入location的时候 默认的首页 就会去找 index.html
          location / {
            root   html;
            index  index.html index.htm;
            #试着去访问一下这个文件 
            #$uri 就是当前请求的路径
            #$uri/ 就去当前这个路径下面再去找一下index.html 或者index.htm
            #如果还是没找到就返回 我们此时的index.html 
            #此时返回的index.html就会被浏览器处理 
            try_files $uri $uri/ /index.html;
          }
        }
      }
    ```

### &#x1F4DA; VueRouter 实现原理
  - vue前置知识
    - 插件
    - 混入
    - Vue.observable()
    - 插槽
    - rander函数
    - 运行时和完整版Vue
    
### &#x1F4DA; VueRouter 模拟实现-分析
  - Vue.use() 如果传入的是函数 就调用函数 如果传入的是对象  就调用对象的install方法
  - new VueRouter 可见是一个构造函数或者Class 这里我们使用Class (Class 也是对象) 并且应该有一个install静态的方法
  - ![Image text](../../image/001.jpg)
### &#x1F4DA; VueRouter-install
  ```js
    static install(Vue) {
      // 1 判断当前是否安装过VueRouter
      if(VueRouter.install.installed) {
        return
      }
      VueRouter.install.installed = true
      // 2. 把Vue实例记录到全局变量
      _Vue = Vue
      // 3. 将创建Vue实例的时候传入的router对象注入到Vue实例上
      // 采用混入的方法注入
      _Vue.mixin({
        // 混入： 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
        // 一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
        beforeCreate() {
          // 如果当前注入则不注入 反之
          if (this.$options.router) {
            _Vue.prototype.$router = this.$options.router
          }
        }
      })
    }
  ```

### &#x1F4DA; VueRouter-createRouteMap
  - createRouteMap
    ```js
      createRouteMap() {
        // 这个方法是将路由规则遍历存储到当前实例的routeMap当中  
        // 键 路由路径
        // 值 路由组件
        this.options.routes.forEach(route => {
          this.routeMap[route.path] = route.component
        })
      }
    ```

### &#x1F4DA; VueRouter-router-link
  - 创建route-link组件 使用 Vue.component 创建
  - 创建失败原因
    - Vue构建版本 vue-cli 默认使用的是运行时版
      - 运行时版
        ```txt
          不支持template模板，需要打包之前提前编译
        ```
      - 完整版
        ```txt
          包含运行时和编译器，体积比运行时版大10K左右，程序运行时把模板转换成render函数
        ```
        
### &#x1F4DA; VueRouter-完整版的 Vue
  - [需要在项目目录配置 vue.config.js 配置](https://cli.vuejs.org/zh/config/#runtimecompiler)
  - 使用Vue完整版  完整版包含编译器 但是文件将大10KB左右 
    - vue.config.js
      ```js
        module.exports = {
          runtimeCompiler: true
        }
      ```

### &#x1F4DA; VueRouter-render
  - template 在完整版编译也是通过render函数去编译
    ```js
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          }
        }, [this.$slots.default]) // this.$slots.default  默认插槽
      }
    ```
### &#x1F4DA;  完整版Vue和运行时版本的区别
  - 完整版包含编译器 可以编译Template模板 大10KB左右 Template编译也是通过render函数去编译的
  - 运行时版本不包含编译器 不能编译Template模板 但是可以通过render函数去编译

### &#x1F4DA; VueRouter-router-view
  - 先实现router-view组件
  - 修改 router-link 组件 a 标签默认行为 
  - 修改URL
  - 修改当前路由 -> 响应式 -> 对应组件刷新

### &#x1F4DA; VueRouter-initEvent
  - 点击前进后退没有渲染对应组件
  - 当活动历史记录条目更改时，将触发popstate事件。如果被激活的历史记录条目是通过对history.pushState()的调用创建的，或者受到对history.replaceState()的调用的影响，popstate事件的state属性包含历史条目的状态对象的副本。
  - 需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()）
  
