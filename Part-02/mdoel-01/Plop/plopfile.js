// plop 入口文件 需要导出一个函数
// 次函数接收一个plop对象  用于创建生成器任务

module.exports = plop => {
  // component生成器名字
  plop.setGenerator('component', {
    // 描述
    description: 'creaste vue components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponents'
      }
    ],
    // 动作对象
    actions: [
      {
        type: 'add',
        // 目标文件路径
        path: 'components/{{name}}/{{name}}.vue',
        // 模板路径
        templateFile: 'plop-templates/components.hbs'
      }
    ]
  })
}