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


  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // 成功时候的回调
  resolve = value => {
    if(this.state === this.penging) {
      this.state = this.fulfilled
      this.value = value
    }
  }
  // 失败时候的回调
  reject = reason => {
    if (this.state === this.penging) {
      this.state = this.rejected
      this.reason = reason
    }
  }

  then(onFulfilledCallback, onRejectedCallback) {
    if(this.state === this.fulfilled) {
      // 成功的回调
      onFulfilledCallback(this.value)
    } else if (this.state === this.rejected) {
      // 失败的回调
      onRejectedCallback(this.reason)
    }
  }
  // 可以判断传入的函数是否符合规范  这里先不写
  isNothing(fn) {

  }
}


const myPromise = new MyPromise(function(resolve, reject) {
  // 使其状态变成成功
  resolve('成功')
  // 使其状态变成失败
  reject('失败')
})

myPromise.then(v => {
  console.log(v)
}, err => {
  console.log(err)
})

myPromise.then(v => {
  console.log(v)
}, err => {
  console.log(err)
})