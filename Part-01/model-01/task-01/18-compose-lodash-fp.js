// lodash 中的fp模块 fp模块的方法都是柯里化之后的函数 并且是先传入函数在传入值
// lodash 的 fp 模块
// NEVER SAY DIE  --> never-say-die
const fp = require('lodash/fp')


const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))

console.log(f('NEVER SAY DIE'))