const { src, dest, parallel, series } = require('gulp')

// 如果我们继续扩展 那么就需要更多的插件引入  所以我们需要一个一次性全部引入的插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// 因为del不是gulp的插件 所以只能单独引入
const del = require('del')

// 因为项目是通过模板构建的  所以我们需要起一个服务去执行
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const style = () => src('src/assets/styles/*.scss', { base: 'src' })
  // 将未换行的括号换行
  .pipe(plugins.sass({ outputStyle: 'expanded' }))
  .pipe(dest('temp'))

const script = () => src('src/assets/scripts/*.js', { base: 'src' })
  // 你得告诉他用什么去处理
  .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
  .pipe(dest('temp'))

const templ = () => src('src/**/*.html', {  base: 'src' })
  // swig是这里用的这个模板引擎  所以需要对应的包去构建
  .pipe(plugins.swig({ data, defaults: { cache: false } }))
  .pipe(dest('temp'))

// 因为构建阶段 我们只需要把项目跑起来 所以图片和字体不需要放到构建阶段的文件中 而是把处理结果直接放到dist
const images = () => src('src/assets/images/**', {  base: 'src' })
  .pipe(plugins.imagemin())
  .pipe(dest('dist'))

  // 因为font下面我们只需要把SVG去处理
const font = () => src('src/assets/fonts/**', { base: 'src' })
  .pipe(plugins.imagemin())
  .pipe(dest('dist'))

// public 静态文件直接放到dist下面  
const extra = () => src('public/**', { base: 'public' })
  .pipe(dest('dist'))

// 为了优化每次更新都需要删除
const clean = () => del(['dist', 'temp'])

const runServe = () => {
  bs.init({
    // 右上角提示是否显示
    notify: false,
    // 是否默认打开浏览器
    open: false,
    port: 10011,
    server: {
      // 启动服务的路径
      baseDir: ['temp', 'src', 'public'],
      // 因为这是开发环境 所以有些文件的是在node_modules里面的  这里做一下路由匹配(优先匹配)
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 用并行任务分别处理
const basic = parallel(style, script, templ)

// 开发阶段(开发环境)  只是编译 为了能执行
const serve = series(basic, runServe)
// 打包阶段(生产环境)
const build = series(
  clean,
  parallel(
    series(basic),
    images,
    font,
    extra
  )
)
module.exports = {
  build,
  serve
}
