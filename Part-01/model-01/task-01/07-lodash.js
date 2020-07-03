// 演示  lodash   是一个一致性、模块化、高性能的 JavaScript 实用工具库。
// first / last / toUpper / reverse / each / includes / find / findIndex

const _ = require('lodash')

const arr = ['Tom', 'Jack', 'Anne', 'Mous']


console.log(_.first(arr))

console.log(_.toUpper(_.first(arr)))
