const { min } = require("lodash")

// 解决硬编码的问题
function checkAge(age) {
  let mini = 18
  return age > mini
}

// 普通的纯函数
function checkAge(mini, age) {
  return age > mini
}

checkAge(18, 22)
checkAge(18, 23)
checkAge(18, 24)
// 可以看到18多次传入

// 简单函数柯里化(一个函数需要多个参数的时候，函数参数可以分开传入)

function checkAge(mini) {
  return function(age) {
    return age > mini
  }
}
// 这样18就被缓存了
let checkAge18 = checkAge(18)
console.log(checkAge18(20))
console.log(checkAge18(18))

// 箭头函数重写
let checkAge = mini => age => age > mini
let checkAge18 = checkAge(18)
console.log(checkAge18(20))
console.log(checkAge18(18))