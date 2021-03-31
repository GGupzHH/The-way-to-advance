Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

一、简答题

1、请简述 Vue 首次渲染的过程。
  - 先执行Vue的构造函数 在构造函数中调用了_init方法
  - _init方法给Vue做了标记 合并传入的options
  - 初始化了生命周期钩子函数和事件 还有reader函数 
  - 接着触发beforeCreate 
  - 实现了依赖注入 inject
  - 接着初始化 props methods data computed watch 挂载到vue实例 将数据设置成响应式
  - 实现了依赖注入 provide
  - 接着触发 created
  - 然后重写了 $mount方法 并且调用了 mountComponent
  - mountComponent 中判断当前是否传入reader函数 如果没有就将模板编译成reader函数返回
  - 并且触发beforeMount生命周期钩子函数
  - 创建并定义了updateComponent 而 updateComponent 中调用了
  - vm._update(vm._reader(), hydrating)
    - vm._reader 方法是调用用户传入的reader或者编译器生成的reader 生成虚拟DOM
    - vm._update 方法是将虚拟DOM转换成真实DOM 更新到界面上
  - 之后将调用 Watcher 构造函数 传入updateComponent （最后一个参数是代表是渲染Watcher）
    - Watcher内部将传入的 updateComponent 赋值给 getter
    - 并且当前是渲染Watcher 立即执行 lazy=false
    - 然后调用 get 方法
      - get 现将当前Watcher保存 因为如果有子组件将先渲染子组件‘
      - 调用getter 也就是 updateComponent
  - 最后触发mounted生命周期钩子函数

  - 补充
    - 父子组件生命周期顺序
      ```txt
        先触发父组件的
          父组件beforeCreate
          父组件created
          父组件beforeMount
          然后在父组件实现渲染Watcher的时候判断是否有子组件 如果有就将当前父组件的渲染Watcher挂载 去渲染子组件
        然后去渲染子组件
          子组件beforeCreate
          子组件created
          子组件beforeMount
          子组件mounted
        子组件渲染完成
        将挂载的父组件拿出用vm._update渲染父组件
        之后执行
          父组件mounted
      ```



2、请简述 Vue 响应式原理。
  - 在init中调用了initstate
    - initstate中判断当前是否传入data 如果传入data则调用initdata 如果没传入则给_data负值成空对象并且绑定响应式
  - 这里面接着调用了initdata这个方法
    - initdata中判断当前传入的data是否和methods props中有重名 没有则调用observe
    - 没有则调用observe 做响应式处理
  - observe中判断当前直是否是对象
    - 判断当前对象是否存在 __ob__ 属性 如果有则说明已经做过响应式处理
    - 判断是否是Vue实例 如果是则直接返回不做处理
    - 如果没有 创建 Observer 对象
    - 返回 observer对象
  - Observer
    - 创建dep对象 并且判断当前value是对象还是数组 分别做不同的处理
      - 数组
        - 先 判断当前浏览器是否存在__proto__
        - 然后创建一个空对象 在空对象内部将push pop shift unshift sort 等一些数组方法的名字定义好 然后将数组的原型对象指向当前这个新创建的对象 并且做响应式处理
        - 遍历数组的每一个成员 如果是对象的话也会将当前对象转换成响应式对象
      - 对象 对象则直接调用walk方法遍历value 依次调用 defineReactive
    - 通过def函数给当前value挂载__ob__属性 并且设置成不可枚举
  - defineReactive
    - getter
      - 设置成可配置 可枚举
      - 判断用户是否已经给当前属性设置了 getter 如果是则执行用户设置的 并且返回value
      - 收集依赖
        - 判断当前属性是否创建了Watcher
        - 如果创建了则将当前Watcher添加到Dep的subs数组中
    - setter
      - 保存新的值
      - 对比新旧的值 (NaN 这里为什么不用 isNaN判断？)
      - 如果新设置的是对象 则调用observe 处理
      - 派发更新 调用dep.notify()
  - 收集依赖
    - watcher的get 方法中调用 pushTarget 将Watcher记录到dep.target 中
    - 访问 data中的属性的时候 触发 getter 收集依赖
    - getter 中调用 dep.depend() 将Watcher对象添加到dep的subs数组中
    - 并且给childOb收集依赖 目的是子对象添加和删除成员是发送通知
  - Watcher
    - 在重新给data的属性设置值得时候触发 dep.notify



3、请简述虚拟 DOM 中 Key 的作用和好处。
  - 在更新节点的时候 如果没有绑定key 新旧节点判断成samevnode
  - samevnode会判断新旧节点的key key一样 或没有 则为相同节点
  - 所以这里没有key会判断成相同节点
  - 然后调用patchvnode去更新节点 patchvnode进行判断对比新老节点text 如果一样则进行下一次新老节点的对比 不一样则更新dom
  - 如果设置了key 同样的情况如果key不一样则直接更换对比方式（当前新换的对比方式 取决于上一次对比的方式）
  - 所以设置key以后 可以避免一些不必要的dom更新
  - 这个前提是当前节点的key不一样 
  - 如果key一样 一样会patchvnode 去判断text等一些属性是否有变化
  - 也就是说在一定情况下 设置key 可以减少dom的更新和patchvnode的对比过程
  - 例子
    ```txt
      同样的节点
      a b c d
      a x b c d
      不设置key 更新了三次dom  新创建了一个dom
      设置key
      只会新创建一个dom
    ```
4、请简述 Vue 中模板编译的过程。
  - 入口函数 compileToFunctions 
    - 先判断缓存中是否一定有编译好的 render 函数
    - 如果没有的话 调用 compile
  - compile 
    - 将用户传入的 options 进行合并
    - 然后调用 baseCompile 编译模板
  - baseCompile 
    - parse 标记 AST 抽象语法树
    - optimize
      - 标记AST(抽象语法树)中的静态根节点
      - 监测静态子树 设置为静态 装不需要再每次渲染重新生成节点
      - patch 的过程中跳过静态根节点
    - generate 将优化过的AST转换成字符串形式的js代码
  - 然后回到 compileToFunctions 
    - 调用compile
    - 将上一步生成的字符串形式js代码转换为函数 调用createFunction
    - render 和 staticRenderFns初始化完毕 挂载到Vue实例的options对应的属性上
  - 模板中不要写无意义的空白和换行  会生成很多余的代码
