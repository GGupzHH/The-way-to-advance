
const less = require('less')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
  grunt.initConfig({
    less: {
      options: {
        // 是否生成对应的sourceMap的文件
        sourceMap: true,
        // 需要用less包去处理less文件
        implementation: less
      },
      main: {
        // 输入输出文件路径
        files: {
          'dist/css/index.css': 'src/less/index.less'
        }
      }
    }, 
  })
  // 使用什么插件  在这里挂载  
  grunt.loadNpmTasks('grunt-contrib-less')
  // 当我们使用的插件越来越多的时候 这里就不适合每次挂载都写一次了  所以就使用了另一个插件 load-grunt-tasks
  // 先导入再使用 这个loadGruntTasks  会将自动加载所有的插件
  loadGruntTasks(grunt)
}
