// pointfree 一种模式  就是函数组合的模式   我们可以把数据处理的过程定义成和数据无关的合成运算
// 在此之前我们需要定义一切辅助函数

// point free
// Hello     World => hello_world
const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f('Hello     World'))
