const { src, dest, parallel, series } = require('gulp')

// loadin plugins
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// webServe
const browserSync = require('browser-sync')
const bs = browserSync.create()
// clean temp and dist
const del = require('del')

// template data
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

// task style scss -> css
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
  .pipe(plugins.sass())
  .pipe(dest('temp'))
}

// task style ES6+ -> ES3
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: [ '@babel/preset-env' ] }))
    .pipe(dest('temp'))
}

// task template-popper -> html
const page = () => {
  return src('src/**/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('temp'))
}

// task serve
const runServe = () => {
  bs.init({
    notify: false,
    port: 10012,
    open: false,
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// task clean
const clean = () => {
  return del(['dist', 'temp'])
}

// run parallel DevBasicTask
const basic = parallel(style, script, page)

// run series devServe
const serve = series(basic, runServe)

module.exports = {
  serve,
  clean
}
