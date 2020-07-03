//  MayBe 函子专门处理值异常 值异常时返回value 为null 的函子

// MayBe 函子
class MayBe {
  static of (value) {
    return new MayBe(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing () {
    return this._value === null || this._value === undefined
  }
}

let r = MayBe.of('hello world')
          .map(x => x.toUpperCase())
          .map(x => null)
          .map(x => x.split(' '))
console.log(r)
