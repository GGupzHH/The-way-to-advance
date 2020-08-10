let _Vue = null

export default class VueRouter {
  static install(Vue) {
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true

    _Vue = Vue

    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          _Vue.prototype.$router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: window.location.pathname
    })
  }

  init() {
    // 调用这两个初始化函数
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents(Vue)  {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          // 给当前DOM元素绑定事件
          on: {
            click: this.cliclHandler
          }
        }, [this.$slots.default]) // this.$slots.default  默认插槽
      },
      methods: {
        cliclHandler(e) {
          // 阻止a默认事件
          e.preventDefault();
          window.location.hash =  this.to
          // 改完URL 渲染对应组件  因为路由data是响应式的  当我们改变了当前路由 就会加载对应的组件 并且会重新渲染
          this.$router.data.current = this.to
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render(h) {
        // 获取当前路由对应的组件  使用render函数去处理 如果只是做这些操作 我们发现 上面router-link的a标签 会有默认行为刷新浏览器
        window.location.hash = self.data.current
        let component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent() {
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.slice(1)
    })
  }
}
