class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 1. 判断data是否为对象
    if (!data && typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象所有属性 绑定get set方法
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newvalue) {
        if (val === newvalue) {
          return
        }
        val = newvalue
        // 发送通知
      }
    })
  }
}