const fp = require("lodash/fp")
const { Container, Maybe } = require('./support')
const { map } = require("lodash")

let maybe = Maybe.of([5, 6, 1])

// 1. 求和
let ex1 = () => {
  let result = 0
  fp.map(v => {
    result = fp.add(result, v)
  }, maybe._value)
  return result
}
// console.log(ex1())

// 2. 获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = () => {
  return fp.first(xs._value)
}
// let ex2 = xs => {
//   return fp.first(xs._value)
// }
console.log(ex2())

// 3. 实现一个函数ex3 使用safeProp 和 fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})

let user = { id: 2, name: 'Albert' }

let ex3 = () => {
  return fp.first(safeProp('name', user)._value)
}

// let ex3 = (name, dict) => {
//   return fp.first(safeProp(name, dict)._value)
// }
console.log(ex3())

// 4. 使用Maybe 重写ex4 不能有if
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n)
//   }
// }

let ex4 = function(n) {
  let functor = Maybe.of(n)
  return functor.map(parseInt)
}
console.log(ex4(null))