const { src, dest, parallel, series, watch } = require('gulp')

// 如果我们继续扩展 那么就需要更多的插件引入  所以我们需要一个一次性全部引入的插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// 因为del不是gulp的插件 所以只能单独引入
const del = require('del')

// 因为项目是通过模板构建的  所以我们需要起一个服务去执行 这个插件可以构建服务
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
// src流处理操作的目标文件   base 转换的时候的基准路径  也就是是否保持原有的目录结构
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    // 将未换行的括号换行
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    // 流处理操作的结果文件
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    // 你得告诉他用什么去处理
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    // 这里可以在下面直接bs配置中使用files直接监视文件改变  但是这里为了减少开销 在这里使用流的方式给浏览器
    .pipe(bs.reload({ stream: true }))
}

const templ = () => {
  return src('src/**/*.html', {  base: 'src' })
    // swig是这里用的这个模板引擎  所以需要对应的包去构建  data是模板传入的数据
    .pipe(plugins.swig({ data, defaults: { cache: false } })) // defaults模板会有缓存 不能热更新
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

// 因为构建阶段 我们只需要把项目跑起来 所以图片和字体不需要放到构建阶段的文件中 而是把处理结果直接放到dist
const images = () => {
  return src('src/assets/images/**', {  base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

  // 因为font下面我们只需要把SVG去处理
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// public 静态文件直接放到dist下面  
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

// 为了优化每次更新都需要删除
const clean = () => {
  return del(['dist', 'temp'])
}

const runServe = () => {
  // 检测源文件的变化 变化后重新编译
  // 部分文件修改只触发指定任务 减少任务开销
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/**/*.html', templ)
  // 当检测到静态文件变化的时候 重启服务
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
    // 自动更新浏览器
  ], bs.reload)
  bs.init({
    // 右上角提示是否显示
    notify: false,
    // 是否默认打开浏览器
    open: false,
    port: 10011,
    // files: 'dist/**',  监控dist下面的所有文件
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

// 用于build阶段  代码压缩  压缩过后可以在dist中利用http-server  或者 serve再启动一个服务去测试打包结果是否正确
const building = () => {
  return src('temp/*.html', { base: 'temp' })
    // 将项目中一些对node_modules的依赖收集起来放到一个文件  只是收集  并不压缩
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // html js css 收集之后有各种文件  所以这里需要 gulp-if判断文件类型  不同的文件使用不同的压缩工具压缩 使用正则匹配文件
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

// 用并行任务分别处理
const basic = parallel(style, script, templ)

// 开发阶段(开发环境)  只是编译 为了能执行
const serve = series(basic, runServe)
// 打包阶段(生产环境)
const build = series(
  clean,
  parallel(
    series(basic, building),
    images,
    font,
    extra
  )
)
module.exports = {
  clean,
  build,
  serve
}
