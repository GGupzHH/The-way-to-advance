// lodash 提供的函数柯里化的方法
const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

let curryGetSum = _.curry(getSum)

console.log(curryGetSum(1)(2, 3))
console.log(curryGetSum(1, 2)(3))
console.log(curryGetSum(1)(2)(3))
console.log(curryGetSum(1, 2, 3))