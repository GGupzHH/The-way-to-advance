module.exports = grunt => {
  // 定义任务foo
  grunt.registerTask('foo', 'is foo', () => {
    console.log('foo')
  })
  
  // 定义任务bar
  grunt.registerTask('bar', 'is bar', () => {
    console.log('bar')
  })
  
  // 定义任务other 并且在任务内部使用任务foo  bar
  grunt.registerTask('other', () => {
    console.log(123)
    grunt.task.run('foo', 'bar')
  })
  
  // 默认任务执行  foo bar   
  // grunt
  grunt.registerTask('default', 'is default', ['foo', 'bar'])

  // 异步任务
  // 由于函数体中需要使用 this，所以这里不能使用箭头函数
  // 如果需要异步可以使用 this.async() 方法创建回调函数
  // 默认 grunt 采用同步模式编码
  grunt.registerTask('async-task', function() {
    const done = this.async()
    setTimeout(() => {
      grunt.task.run('foo')
      done()
    }, 1000);
  })

  // 怎么让任务执行失败  registerTask的回调函数返回false
  grunt.registerTask('err-task', () => {
    console.log('err-task-message')
    return false
  })

  // 如果同时调用多个任务 那么当前任务失败之后 后面的任务不会执行 如果想让当前全部任务执行 则在命令后面执行--force
  grunt.registerTask('default', 'is default', ['foo', 'err-task', 'bar'])

  // 异步任务 想要让任务执行失败  则需要在done函数传入false
  grunt.registerTask('async-task-test', function() {
    const done = this.async()
    setTimeout(() => {
      done(false)
    }, 5000);
  })

  // 这里尝试一下异步错误任务 会不会阻塞后面的任务执行 
  grunt.registerTask('default', ['foo', 'async-task-test', 'bar'])

  // 通过demo测试 异步任务首先会阻塞后面任务的执行 如果当前异步任务执行失败   也会是异步任务结束之后触发任务失败
}
