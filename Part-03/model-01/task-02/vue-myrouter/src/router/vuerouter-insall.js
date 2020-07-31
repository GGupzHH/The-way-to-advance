let _Vue = null
export default class VueRouter {
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
          // 当前如果不是默认页面 刷新页面的时候 获取当前路由并修改current
          this.$options.router.data.current = window.location.pathname
          _Vue.prototype.$router = this.$options.router
          _Vue.prototype.$router.init()
        }
      }
    })
  }

  constructor(options) {
    console.log(1)
    // 当前传入构造的属性 路由规则
    this.options = options
    // 将options传入的路由规则 解析 存储到routeMap中
    // 键  路由地址
    // 值  路由组件
    // 最后将对应的地址和组件渲染到浏览器中
    this.routeMap = {}
    // 响应式对象 current 当前路由对象
    // 响应式 使用 _Vue.observable实现 实现响应式对象
    this.data = _Vue.observable({
      current: '/'
    })
  }

  // 调用在router挂载到vue实例上面的后面调用
  init() {
    // 调用这两个初始化函数
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    // 这个方法是将路由规则遍历存储到当前实例的routeMap当中  
    // 键 路由路径
    // 值 路由组件
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents(Vue)  {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // // 使用插槽 slot
      // template: `<a :href="to"><slot></slot></a>`

      // 使用render函数
      // h 函数是创建虚拟DOM
      // h 函数存在3个参数
      // 1. 创建元素对应的选择器  因为创建的是  a   所以直接使用标签选择器
      // 2. 设置该元素的DOM属性
      // 3. 设置该元素内容  也就是生成元素的子元素
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
          // 阻止默认事件之后改变浏览器URL
          // pushState 有三个参数
          // 1. 后面要用的数据
          // 2. 当前页面title
          // 3. 要改成什么样的URL
          history.pushState({}, '', this.to)
          // 改完URL 渲染对应组件  因为路由data是响应式的  当我们改变了当前路由 就会加载对应的组件 并且会重新渲染
          this.$router.data.current = this.to
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render(h) {
        // 获取当前路由对应的组件  使用render函数去处理 如果只是做这些操作 我们发现 上面router-link的a标签 会有默认行为刷新浏览器
        let component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent() {
    // popstate 只有在pushState执行之后才会存在这个事件 
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
