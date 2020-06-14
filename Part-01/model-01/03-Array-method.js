// 模拟常用高阶函数

// map 遍历数组 处理数组的每一项之后存入一个新数组返回
/**
 * 
 * @param {Array} arr 
 * @param {Function} fn 
 */
const map = function(arr, fn){
  let result = []
  for (let value of arr) {
    result.push(fn(value))
  }
  return result
}
// test
let r = map([1, 2, 3], item => item * item)
console.log(r)


// every 数组的每一项是否匹配 如果有一项不匹配则返回 false
/**
 * 
 * @param {Array} arr 
 * @param {Function} fn 
 */
const every = function(arr, fn) {
  let result = true
  for (let value of arr) {
    if (!fn(value)) {
      result = false
      break
    }
  }
  return result
}
let r = every([1, 2, 3], item => item > 1)
// let r = every([1, 2, 3], item => item >= 1)
console.log(r)


// some 数组的每一项是否匹配 只要有一项匹配则返回 true
/**
 * 
 * @param {Array} arr 
 * @param {Function} fn 
 */
const some = function(arr, fn) {
  let result = false
  for (let value of arr) {
    if (fn(value)) {
      result = true
      break
    }
  }
  return result
}
// let r = some([1, 2, 3], item => item % 2 === 0)
let r = some([1, 1, 3], item => item % 2 === 0)
console.log(r)