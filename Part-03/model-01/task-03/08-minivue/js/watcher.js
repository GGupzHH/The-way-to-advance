class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中属性名
    this.key = key
    // 回调函数负责处理视图
    this.cb = cb
    // 把Watcher对象记录到Dep的静态属性target中
    Dep.target = this
    // 在获取上一次的值的时候  就会触发get方法 触发get方法就会触发Dep的addsub方法  这样就将当前对象的Watcher处理函数 push 到 Dep的 subs中了 
    // 上次的值
    this.oldValue = vm[key]
  }
  // 当数据发生变得时候更新视图
  update() {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) {
      return
    }
    this.cb(newValue)
  }
}