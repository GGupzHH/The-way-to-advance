class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2. 把data中的成员转换成getter 和 setter 注入到Vue实例
    this._proxyData(this.$data)
    // 3. 调用observer对象，监听数据的变化
    // 4. 调用compiler对象，解析插值表达式和指令
  }

  // _ 开头的都是默认私有的
  _proxyData(data) {
    // 1. 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 2. 把data的属性注入到vue实例
      // defineProperty 可以给当前绑定的对象添加任意key   也就是下面this虽然没有当前data拥有的属性 但是可以通过defineProperty添加 并且赋值
      Object.defineProperty(this, key, {
        // 可枚举
        enumerable: true,
        // 可遍历
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}
