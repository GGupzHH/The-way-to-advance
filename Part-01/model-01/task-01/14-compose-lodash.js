// Lodash 中函数组合的使用方式 _.flowRight _.flow

// lodash 中的函数组合的方法 _.flowRight()
const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three']))
