class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compiler(this.el)
  }
  // 编译所有节点 如果是文本节点就解析插值表达式  如果是元素节点就解析指令
  compiler(el) {
    // el.childNodes 伪数组 所以需要Array.from 转换成数组
    Array.from(el.childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compilerText(node)
      } else if (this.isElementNode(node)) {
        this.compilerElement(node)
      }
      // 如果当前元素存在子元素 则递归调用
      if (node.childNodes && node.childNodes.length) {
        this.compiler(node)
      }
    })
  }
  // 解析元素节点的指令
  compilerElement(node) {
    // 1. 遍历当前元素所有属性
    Array.from(node.attributes).forEach(attr => {
      // attr就是当前属性的描述
      // attr.name 当前属性名
      // attr.value 当前属性值
      let attrName = attr.name
      // 判断当前属性是不是V指令
      if (this.isDirective(attrName)) {
        // v-text -> text
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  update(node, key, attrName) {
    // 通过指令名称调用指定的处理函数
    let updateFn = this[attrName + 'Updater']
    // 判断当前 处理函数 是否存在
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  // text指令的具体实现 需要改变当前节点的内容
  textUpdater(node, value, key) {
    node.textContent = value
    // this.vm  这里不能使用this  因为当前函数式直接调用的 所以需要在上面调用的时候改变this 指向
    // new Watcher(this.vm, key, (newValue) => {
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  
  // model指令的具体实现 只需要改变当前input的内容
  modelUpdater(node, value, key) {
    node.value = value
    // 同理 这里直接将改变的值渲染到视图中
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 实现 双向数据绑定 将新的值更新到 vm 实例对应的数据中
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // v-html 实现
  htmlUpdater(node, value, key) {
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }
  onUpdater(node, value, key) {
    console.log(node, value, key)
  }

  // 解析插值表达式
  compilerText(node) {
    // 利用正则匹配插值表达式的内容 通过this.vm 去获取实际数据替换
    // {} 转义  . 匹配一个字符 + 重复上一个 ？非贪婪模式  ()分组
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      // trim 去除空格
      // $1 上面正则利用()分组  每一个()就是一个分组  $1 获取分组1  以此类推
      let key = RegExp.$1.trim()
      // 之后使用replace替换节点内容
      node.textContent = value.replace(reg, this.vm[key])
      // 创建Watcher对象  当数据发生变化的时候更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断当前的属性是否是一个指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
