import {init, h, thunk} from 'snabbdom'
// 2. div 中插入 h1 p标签

// 初始化patch函数
let patch = init([])

// 创建虚拟DOM
let VNode = h('div#container', [
  h('h1', 'hello world'),
  h('p', '这是创建的')
])

let app = document.querySelector('#app')

let oldVNode = patch(app, VNode)

// 2秒之后更新 DOM
setTimeout(() => {
  VNode = h('div#container', [
    h('h1', 'hello snabbdom'),
    h('p', '这是第二次创建的')
  ])
  patch(oldVNode, VNode)

  // 之后清空页面元素
  // 官方提供的方法  这样会报错
  // patch(oldVNode, null)

  // 我们可以使用注释标签去替换虚拟DOM  
  // 注释标签创建 !
  patch(oldVNode, h('!'))
}, 2000);