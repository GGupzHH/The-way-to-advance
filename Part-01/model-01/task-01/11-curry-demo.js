const _ = require('lodash')
const { find } = require('lodash')

// 函数柯里化案例

// 1. 匹配字符串中的数字和空格

let match = _.curry(function(reg, str) {
  return str.match(reg)
})

let havaSpace = match(/\s+/g)
let havaNumber = match(/\d+/g)

console.log(havaSpace('asd as12 312'))
console.log(havaNumber('asdas12312'))

// 2. 匹配数组中每个元素有空格和字符串的元素返回

let filter = _.curry(function(f, arr) {
  return arr.filter(f)
})

const findSpace = filter(havaSpace)
const findNumber = filter(havaNumber)
console.log(findSpace(['asd dasd', 'as dd dasd', 'asdasdas']))
console.log(findNumber(['sd13 da32sd', 'as3 dd dasd', '3asdasdas', 'd', '123']))
