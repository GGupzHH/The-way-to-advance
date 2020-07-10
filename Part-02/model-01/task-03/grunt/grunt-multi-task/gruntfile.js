module.exports = grunt => {
  // 多目标模式，可以让任务根据配置形成多个子任务
  grunt.initConfig({
    build: {
      foo: 123,
      bar: 456
    }
  })

  grunt.registerMultiTask('build', function() {
    // 将build中的子任务按照定义顺序执行  target当前任务名  data当前任务绑定数据
    console.log(`task: build, target: ${this.target}, data: ${this.data}`)
  })

  grunt.initConfig({
    builds: {
      options: {
        msg: 'task builds'
      },
      foo: {
        options: {
          msg: 'task foo'
        }
      },
      bar: 456
    }
  })

  grunt.registerMultiTask('builds', function() {
    // options会拿当前子任务的options配置选项  如果当前子任务设置了配置选项  那么就输出子任务的配置项  如果没有配置 就用父任务的配置选项
    console.log(this.options())
    // 配置了options  此时data的输出就是options定义的数据
    console.log(`target: ${this.target} data: ${this.data}`)
  })
}
