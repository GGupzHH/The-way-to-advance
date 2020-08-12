import {
  h,
  init
} from 'snabbdom'
// 导入需要的模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
// 导入需要的数据
import snabbdomData from './snabbdomData'

// 获取patch函数
let patch = init([style, eventlisteners])

let data = [...snabbdomData]
const content = document.querySelector('#app')

var sortBy = 'rank';
let vnode = view(data);

// 初次渲染
let oldVnode = patch(content, vnode)


// 渲染
function render() {
  oldVnode = patch(oldVnode, view(data));
}
// 生成新的VDOM
function view(data) {
  return h('div#content-wrapper',
    [
      h('h1', 'Top 10 movies'),
      h('div',
        [
          h('a.btn.add', {
            on: {
              click: add
            }
          }, 'Add'),
          'Sort by: ',
          h('span.btn-group',
            [
              h('a.btn.rank', {
                'class': {
                  active: sortBy === 'rank'
                },
                on: {
                  // 设置点击事件触发的函数和传入的参数
                  click: [changeSort, 'rank']
                }
              }, 'Rank'),
              h('a.btn.title', {
                'class': {
                  active: sortBy === 'title'
                },
                on: {
                  click: [changeSort, 'title']
                }
              }, 'Title'),
              h('a.btn.desc', {
                'class': {
                  active: sortBy === 'desc'
                },
                on: {
                  click: [changeSort, 'desc']
                }
              }, 'Description')
            ])
        ]),
      h('div.list', data.map(movieView))
    ]);
}

// 添加一条数据 放在最上面
function add() {
  const n = snabbdomData[Math.floor(Math.random() * 10)];
  data = [{
    rank: data.length + 1,
    title: n.title,
    desc: n.desc,
    elmHeight: 0
  }].concat(data);
  render();
}
// 排序
function changeSort(prop) {
  sortBy = prop;
  data.sort(function (a, b) {
    // 根据不同的字段排序 需要了解字符串的排序规则
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  });
  render();
}

// 单条数据
function movieView(movie) {
  return h('div.row', {
    key: movie.rank,
    style: {
      display: 'none',
      delayed: {
        transform: 'translateY(' + movie.offset + 'px)',
        display: 'block'
      },
      remove: {
        display: 'none',
        transform: 'translateY(' + movie.offset + 'px) translateX(200px)'
      }
    },
    hook: {
      insert: function insert(vnode) {
        movie.elmHeight = vnode.elm.offsetHeight;
      }
    }
  }, [
    h('div', {
      style: {
        fontWeight: 'bold'
      }
    }, movie.rank),
    h('div', movie.title),
    h('div', movie.desc),
    h('div.btn.rm-btn', {
      on: {
        click: [remove, movie]
      }
    }, 'x')
  ]);
}
// 删除数据
function remove(movie) {
  data = data.filter(function (m) {
    return m !== movie;
  });
  render()
}