class MyPromise{
  // 状态
  state = 'PENGING'
  // 准备状态
  penging = 'PENGING'
  // 成功状态
  fulfilled = 'FULFILLED'
  // 失败状态
  rejected = 'REJECTED'
  // 成功的结果
  value = undefined
  // 失败的结果
  reason = undefined
  // 成功的回调
  onFulfilledCallback = []
  // 失败的回调
  onRejectedCallback = []

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error.message)
    }
  }
  // 成功时候的回调
  resolve = value => {
    if(this.state === this.penging) {
      this.state = this.fulfilled
      this.value = value
      // 判断成功回调是否存在  存在则执行
      while(this.onFulfilledCallback.length) this.onFulfilledCallback.shift()(this.value)
    }
  }
  // 失败时候的回调
  reject = reason => {
    if (this.state === this.penging) {
      this.state = this.rejected
      this.reason = reason
      while(this.onRejectedCallback.length) this.onRejectedCallback.shift()(this.reason)
    }
  }

  then(onFulfilledCallback, onRejectedCallback) {
    // 想要链式调用 就需要在then方法返回一个新的myPromise
    let promise2 = new MyPromise((resolve, reject) => {
      if(this.state === this.fulfilled) {
        setTimeout(() => {
          try {
            // 先执行成功的回调  然后将回调的返回值传入下一个myPromise的resolve中
            resolve(onFulfilledCallback(this.value))
          } catch (error) {
            reject(error)
          }
        }, 0);
      } else if (this.state === this.rejected) {
        // 失败的回调
        reject(onRejectedCallback(this.reason))
      } else {
        this.onFulfilledCallback.push(onFulfilledCallback)
        this.onRejectedCallback.push(onRejectedCallback)
      }
    })
    return promise2
  }
  // 可以判断传入的函数是否符合规范  这里先不写
  isNothing(fn) {

  }
}


const myPromise = new MyPromise(function(resolve, reject) {
  // 使其状态变成成功
  // setTimeout(() => {
    resolve('成功')
    // console.log(asd)
  // }, 4000);
  // 使其状态变成失败
  // reject('失败')
})

myPromise.then(v => {
  console.log(123)
  return 12
}, err => {
  console.log(err, 1)
}).then(v => {
  console.log(v + 12)
}, err => {
  console.log(err, 2)
})