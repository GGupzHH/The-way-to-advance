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
    console.log(node)
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
