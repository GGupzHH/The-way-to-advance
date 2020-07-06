const fs = require('fs')

exports.callback = done => {
  console.log('callback task')
  done()
}

// 想要让任务执行失败就在done中返回一个错误对象
exports.callback_error = done => {
  console.log('callback task')
  done(new Error('task failed'))
}

// promise的状态也可以作为返回值返回 去作为任务的返回对象
exports.promise = () => {
  console.log('promise task')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task')
  return Promise.reject(new Error('task failed'))
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}

exports.stream = () => {
  const read = fs.createReadStream('yarn.lock')
  const write = fs.createWriteStream('a.txt')
  // node中管道流
  read.pipe(write)
  return read
}

// exports.stream = done => {
//   const read = fs.createReadStream('yarn.lock')
//   const write = fs.createWriteStream('a.txt')
//   read.pipe(write)
//   read.on('end', () => {
//     done()
//   })
// }
