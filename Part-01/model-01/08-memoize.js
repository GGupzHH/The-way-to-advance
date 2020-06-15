const _ = require('lodash')


function getArea(r) {
  console.log(r)
  return Math.PI * r * r
}

// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(5))
// console.log(getAreaWithMemory(5))


// 模拟memoize函数的实现
/**
 * 
 * @param {Function} f 
 * @returns {Function} 
 */
function memoize(f) {
  let cache = {}
  return function() {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || f.apply(f, arguments)
    return cache[key]
  }
}

let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(5))
console.log(getAreaWithMemory(5))
