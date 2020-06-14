// 高阶函数 函数作为返回值 
function makeFn() {
  let result = 'Hello Higher Order Function'
  return function () {
    console.log(result)
  }
}

const fn = makeFn()
fn()

makeFn()()

// once function 对传入函数只执行一次
/**
 * 
 * @param {callback Function} fn 
 */
function once(fn) {
  let done = true
  return function (str) {
    if (done) {
      done = false
      fn.apply(this, arguments)
    }
  }
}

let conStr = once(function (str) {
  console.log(str)
})

conStr('已经执行')
conStr('还可以再次执行吗')

// 上面的逻辑稍加改造成一个防抖函数
function debounce(fn) {
  let result = true
  return function(str) {
    if (result) {
      result = false
      fn.apply(this, arguments)
      setTimeout(() => {
        result = true
      }, 500);
    }
  }
}
let conStr = debounce(function (str) {
  console.log(str)
})

conStr('执行')
conStr('执行')
conStr('执行')
conStr('执行')
conStr('执行')
setTimeout(() => {
  conStr('执行')
}, 500);