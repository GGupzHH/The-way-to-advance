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
  successCallback = []
  // 失败的回调
  failCallback  = []

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  // 成功时候的回调
  resolve = value => {
    if(this.state === this.penging) {
      this.state = this.fulfilled
      this.value = value
      // 判断成功回调是否存在  存在则执行
      while(this.successCallback.length) this.successCallback.shift()()
    }
  }
  // 失败时候的回调
  reject = reason => {
    if (this.state === this.penging) {
      this.state = this.rejected
      this.reason = reason
      while(this.failCallback.length) this.failCallback.shift()()
    }
  }

  then(onFulfilledCallback, onRejectedCallback) {
    // 参数可选
    onFulfilledCallback = onFulfilledCallback ? onFulfilledCallback : value => value
    onRejectedCallback = onRejectedCallback ? onRejectedCallback : reason => { throw reason }
    // 想要链式调用 就需要在then方法返回一个新的myPromise
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if(this.state === this.fulfilled) {
        setTimeout(() => {
          try {
            let result = onFulfilledCallback(this.value)
            // 先执行成功的回调  然后将回调的返回值传入下一个myPromise的resolve中
            resolvePromise(promise2, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      } else if (this.state === this.rejected) {
        setTimeout(() => {
          try {
            // 失败的回调
            let result = onRejectedCallback(this.reason)
            resolvePromise(promise2, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let result = onFulfilledCallback(this.value)
              // 先执行成功的回调  然后将回调的返回值传入下一个myPromise的resolve中
              resolvePromise(promise2, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              // 失败的回调
              let result = onRejectedCallback(this.reason)
              resolvePromise(promise2, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }

  catch(onRejectedCallback) {
    return this.then(undefined, onRejectedCallback)
  }

  // 静态方法只能class直接去调用 class的实例对象并不能调用
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  static all(array) {
    let result = []
    let i = 0
    
    return new MyPromise((resolve, reject) => {
      function addData(index, value) {
        result[index] = value
        i++
        if (i === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (array[i] instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, current)
        }
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断返回值类型 promise去调用.then  普通值直接返回
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}