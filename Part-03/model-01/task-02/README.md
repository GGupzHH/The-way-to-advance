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
### &#x1F4DA; History 模式 - nginx.