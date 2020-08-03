class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 1. 判断data是否为对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象所有属性 绑定get set方法
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    // 如果value是对象 此时也会转换为get 和 set
    this.walk(val)
    // 当原本在data属性中是基本类型的数据，后来改变成了复杂数据类型的时候，我们需要把新改变的值也绑定 get 和 set
    let self = this
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newvalue) {
        if (val === newvalue) {
          return
        }
        val = newvalue
        self.walk(newvalue)
        // 发送通知
      }
    })
  }
}