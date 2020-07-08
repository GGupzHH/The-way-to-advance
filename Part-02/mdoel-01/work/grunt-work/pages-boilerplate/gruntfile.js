// 编(处理模板)译
// serve运行
// 打包压缩
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {

  grunt.initConfig({
    sass: {
      options: {
        // 需要用less包去处理less文件
        implementation: sass
      },
      main: {
        // 输入输出文件路径
        files: {
          'dist/css/index.css': 'src/assets/styles/*.scss'
        }
      }
    }, 
  })

  grunt.loadNpmTasks('grunt-contrib-sass')
  loadGruntTasks(grunt)
}
