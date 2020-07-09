#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    default: 'myproject',
    message: 'You Project Name'
  }, {
    type: 'input',
    name: 'v',
    default: '0.0.0',
    message: 'Version'
  }, {
    type: 'input',
    name: 'development',
    message: 'development api'
  }, {
    type: 'input',
    name: 'intranet',
    message: 'intranet api'
  }
]).then(anwsers => {
  let copy = function (src, dst) {
    let paths = fs.readdirSync(src) //同步读取当前目录
    paths.forEach(function (path) {
      let _src = src + '/' + path
      let _dst = dst + '/' + path
      fs.stat(_src, function (err, stats) { //stats  该对象 包含文件属性
        if (err) throw err;
        if (stats.isFile()) { //如果是个文件则拷贝
          ejs.renderFile(_src, anwsers, (err, result) => {
            if (err) throw err
            // 写入目标目录
            fs.writeFileSync(_dst, result)
          })
        } else if (stats.isDirectory()) { //是目录则 递归 
          checkDirectory(_src, _dst, copy)
        }
      })
    })
  }
  let checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdirSync(dst)
        callback(src, dst)
      } else {
        callback(src, dst)
      }
    })
  }

  // 根据用户回答生成文件
  const temPath = path.join(__dirname, 'templates')
  // 目标目录  获取当前命令行路径
  const dirPath = process.cwd()
  // 将模板目录输出到目标目录
  checkDirectory(temPath, dirPath, copy)
})
