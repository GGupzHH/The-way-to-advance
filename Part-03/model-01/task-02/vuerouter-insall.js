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
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }
  constructor(options) {
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

  createRouteMap() {
    // 这个方法是将路由规则遍历存储到当前实例的routeMap当中  
    // 键 路由路径
    // 值 路由组件
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }
  
}
