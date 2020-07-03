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
  // 调用curry返回一个新的函数  这里不使用匿名函数是因为后面要递归去将每次新传入的参数再次判断
  return function curried(...nextArgs) {
    // es6剩余参数  ... 获取所有传入的参数存放到一个数组中
    // 判断传入实参(nextArgs)的个数 
    // 如果实参个数大于等于f函数的形参个数则直接调用f返回函数结果
    // 如果实参个数小于形参个数则返回一个新的函数，新的函数可以继续接收后续传入的参数，并且能将之前传入的参数存储
    if (nextArgs.length < f.length) {
      return function(...args) {
        return curried(...nextArgs.concat(args))
      }
    }
    // ... 展开运算符 将数组展开传入
    return f(...nextArgs)
  }
}