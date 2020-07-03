// forEach
/**
 * 
 * @param {Array} arr 
 * @param {callback Function} fn 
 */
function forEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i)
  }
}
// test
// let r = [1, 3, 4]
// forEach(r, item => {
//   console.log(item)
// })



// fliter
/**
 * 
 * @param {Array} arr 
 * @param {callback Function} fn 
 */
function filter(arr, fn) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      result.push(arr[i])
    }
  }
  return result
}
// test
// let r = [1, 3, 4]
// let c = filter(r, item => item > 2)
// console.log(c)



// filter优化
/**
 * 
 * @param {Array} arr 
 * @param {callback Function} fn 
 */
function filter(arr, fn) {
  let result = []
  forEach(arr, item => {
    if (fn(item)) {
      result.push(item)
    }
  })
  return result
}
// test
let r = [1, 3, 4]
let c = filter(r, item => item > 2)
console.log(c)