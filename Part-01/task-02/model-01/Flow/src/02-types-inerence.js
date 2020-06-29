// 类型推断
//@flow

function square(n) {
  return n * n
}

square('100')
// 当我们这样写的时候flow会出现提示  他推断我们的代码执行不能传入字符串
