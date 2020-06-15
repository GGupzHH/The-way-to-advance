// 实现curry函数

function getSum(a, b, c) {
  return a + b + c
}

let curryGetSum = curry(getSum)

console.log(curryGetSum(1, 2, 3))
console.log(curryGetSum(1)(2, 3))
console.log(curryGetSum(1, 2)(3))
console.log(curryGetSum(1)(2)(3))

function curry(f) {
  return function curried(...nextArgs) {
    if (nextArgs.length < f.length) {
      return function(...args) {
        return curried(...nextArgs.concat(args))
      }
    }
    return f(...nextArgs)
  }
}