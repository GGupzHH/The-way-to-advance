// 纯函数和不纯函数
// slice and splice


let arr = [1, 2, 3, 4, 5]

// 纯函数
console.log(arr.slice(0, 3))
console.log(arr.slice(0, 3))
console.log(arr.slice(0, 3))


// 不纯函数
console.log(arr.splice(0, 3))
console.log(arr.splice(0, 3))
console.log(arr.splice(0, 3))

// 纯函数
function getSum(n1, n2) {
  return n1 + n2
}

console.log(getSum(1, 2))
console.log(getSum(1, 2))
console.log(getSum(1, 2))
console.log(getSum(1, 2))