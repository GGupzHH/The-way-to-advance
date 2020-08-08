import {init, h, thunk} from 'snabbdom'

// 1. hello world
// 参数 数组，模块
// 返回值 patch 函数 作用对比两个VNode的差异更新到真是的DOM  init 初始化一个 patch 函数
let patch = init([])
// 第一个参数 标签 + 选择器
// 第二个参数 如果是字符串就是当前创建的标签的内容
let VNode = h('div#content.cls', 'hello world')

let app = document.querySelector('#app')

// patch 函数主要还是更新DOM
// 第一个参数可以是DOM 内部会把DOM转换成VNode 第一个参数如果是真实DOM 就会转换成虚拟DOM 然后和第二个参数的虚拟DOM对比 最后更新
// 第二个参数 VNode
// 返回值 VNode
let oldVNode = patch(app, VNode)

VNode = h('div', 'hello snabbdom')
patch(oldVNode, VNode)

