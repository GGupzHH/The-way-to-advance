const Generator = require('yeoman-generator')


module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '项目想叫啥?',
        default: '项目名字'
      },
      {
        type: 'input',
        name: 'v',
        message: '版本?',
        default: '0.0.0'
      }
    ]).then(answers => {
      this.answers = answers
    })
  }

  writing() {
    // 将当前模板的相对路径放到一个数组当中
    const fileList = [
      'index.html',
      'js/index.js',
      'style/style.css'
    ]
    
    fileList.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })

  }
}
