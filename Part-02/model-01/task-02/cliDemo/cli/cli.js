#!/usr/bin/env node
// cli 的文件必须有一个特定的文件头

// 如果是Linux  或者Mac 需要修改文件的权限  755'

// 想要和用户交互 需要安装inquirer这样的模块
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 其实感觉写法和之前的脚手架工具都一样   可能那些脚手架内部也使用了inquirer
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'You Project name?'
  }
]).then(anwsers => {
  // 根据用户回答生成文件
  const temPath = path.join(__dirname, 'templates')
  // 目标目录  获取当前命令行路径
  const dirPath = process.cwd()
  // 将模板目录输出到目标目录
  fs.readdir(temPath, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      // 通过模板渲染文件 这里使用模板引擎 ejs  第一个参数模板绝对路径  第二个当前数据上下文  第三个回调函数
      ejs.renderFile(path.join(temPath, file), anwsers, (err, result) => {
        if (err) throw err
        // 写入目标目录
        fs.writeFileSync(path.join(dirPath, file), result)
      })
    })
  })
})
