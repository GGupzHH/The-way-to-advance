// 此文件会作为Generator的核心入口
// 需要导出一个继承自 yeoman generator 的类型
// yeoman generator在工作的时自动调用我们在此类型中定义的一些生命周期的方法
// 我们在这些方法中可以通过父类提供的一些工具方法实现一些功能， 例如文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  // 在创建阶段 询问用户 并且记录用户输入内容
  prompting () {
    // 这里内部使用的也是Promise
    return this.prompt([
      {
        // type 交互方式类型
        type: 'input',
        // 用户输入的值 保存的key
        name: 'name',
        // 提示
        message: '你想要一个啥样的名字呐',
        // 默认值
        default: '你没有输入名字呢'
        // default: this.appname 当前生成项目目录的默认名字
      }
    ]).then(answers => {
      // answers 是 上面的name值和用户输入的值  { name: 'user input' }
      this.answers = answers
      // 之后就可以使用这个数据灌入的模板当中
    })
  }
  // yeoman 在生成文件的时候自动调用这个方法
  writing() {
    // fs文件写入方法 高度封装的
    // this.fs.write(
    //   this.destinationPath('demo.txt'),
    //   Math.random().toString()
    // )






    // 模板文件路径
    const tmpl = this.templatePath('foo.txt')
    // 输出目标路径
    const output = this.destinationPath('fooCopy.txt')
    // 模板数据上下文
    const context = this.answers
    // 之后灌入
    this.fs.copyTpl(tmpl, output, context)
  }
}

// 设置完这些以后我们将这个命令链接到全局
// npm link
// 让它成为一个全局模块的包
// 此时我们到一个指定的文件目录下  sample就是创建的全局模块的指令  generator-sample  - 后面是什么 这个执行指令就是什么
// yo sample  