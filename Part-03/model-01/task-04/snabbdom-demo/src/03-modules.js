import { init, h } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// 创建patch函数  init函数加载模块
let patch = init([style, eventlisteners])

let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click: clickHandler
  }
}, [
  h('h1', 'hello world'),
  h('p', {
    style: {
      fontSize: '14px',
      color: 'yellow'
    }
  }, '我是p标签')
])

function clickHandler() {
  console.log('我被点击了')
}

// 获取占位元素
let app = document.querySelector('#app')

// 挂载
patch(app, vnode)
