#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'You Project Name'
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
