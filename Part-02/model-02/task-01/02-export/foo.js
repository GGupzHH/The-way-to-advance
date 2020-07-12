// 导出 单独导出
// export let foo = 1

// export function add() {

// }


// 一次性导出
// let foo = 1

// function add() {}

// export {
//   foo,
//   add
// }

// 为输出的成员重命名
let foo = 1

function add() {}

let name = 123

// export {
//   foo as userFoo,  // 导入到时候就应该导入userFoo
//   add as default // 如果设置为default就是当前模块默认导出的成员  如果要导入则需要重命名 import { default as addFun } from './foo.js'
// }


// 也可以直接默认导出
export default name
// 如果这样默认导出  就直接能导入  name 在导入的时候就可以随便取名字
import name from './foo.js'
