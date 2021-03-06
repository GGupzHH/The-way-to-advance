// JavaScript异步编程： 
// 因为JS是单线程执行，当我们在进行一些网络请求任务，或者定时器任务的时候， 代码就会在此等候，直到异步任务结束才会继续向下执行，这样的情况就会造成阻塞，会让用户存在长时间的等待。


// EventLoop(事件循环)
// 当前执行栈任务处理完成之后，即栈空的时候， 事件触发线程才会从消息队列取出一个任务，放入执行栈中执行，当这个新任务执行完成之后，重复上一步操作，再取一个任务，这种机制被称为事件循环。

// 消息队列
// 首先消息队列是类似队列的数据结构，遵循先进先出(FIFO)的原则
// js在执行的过程中遇到异步操作的时候，会将当前的回调函数加入到消息队列中，当执行栈的同步任务执行完成之后，才会被执行

// 宏任务(macrotask)与微任务(microtask)
// 宏任务： 主代码块、setTimeout、setInterval等
// 微任务： Promise、process、nextTick

// js执行首先会执行当前的宏任务，宏任务执行完成之后，会执行微任务  例如setTimeout等一些异步操作会加入到下一次宏任务中，每次宏任务执行完成之后，都会清空微任务，然后再次重复
