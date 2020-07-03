// 函子  Functor 
// 容器 包含值和值的变形关系 (也就是函数)
// 一个特殊的容器 通过一个普通的对象实现  该对象具有map方法  map 方法可以运行一个函数对值进行处理
// 最终函子返回一个新的函子

class Container {
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return new Container(fn(this._value))
  }
}