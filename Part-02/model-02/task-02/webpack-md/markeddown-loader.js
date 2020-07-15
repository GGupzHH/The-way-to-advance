const marked = require('marked')

module.exports = source => {
  // console.log(source)
  // return 'console.log("h/ello")'

  // 方法1  先使用marked-loader 处理成 html 使用json.stringify去处理字符
  const html = marked(source)
  // html 当中的符号会报错
  // return `module.exports = '${html}'`
  
  // 所以可以使用JSON.stringify() 转义  将其中的符号转义
  // return `module.exports = ${JSON.stringify(html)}`
  
  // 方法2 使用html-loader去处理
  // 这一步直接在 webpack.config.js 中使用 html-loader去处理
  return html
}
