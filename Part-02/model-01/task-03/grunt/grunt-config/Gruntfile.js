module.exports = grunt => {
  // 为任务添加一些配置选项
  grunt.initConfig({
    // 键对应任务名称 值可以是任意类型的数据
    foo: {
      bar: 123
    }
  })

  grunt.registerTask('foo', () => {
    // 任务中可以使用grunt.config() 获取任务配置
    console.log(grunt.config('foo'))
    // 如果配置数据是对象 就可以使用下面的方法去获取配置
    console.log(grunt.config('foo.bar'))
  })
}
