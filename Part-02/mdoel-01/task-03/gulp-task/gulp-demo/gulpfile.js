const { src, dest, parallel } = require('gulp')

const sass = require('gulp-sass')
const babel  = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')

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
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(dest('temp'))

const script = () => src('src/assets/scripts/*.js', { base: 'src' })
  // 你得告诉他用什么去处理
  .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(dest('temp'))

const templ = () => src('src/**/*.html', {  base: 'src' })
  // swig是这里用的这个模板引擎  所以需要对应的包去构建
  .pipe(swig({ data, defaults: { cache: false } }))
  .pipe(dest('temp'))

const image = () => src('src/assets/images/**', {  base: 'src' })
  .pipe(imagemin())
  .pipe(dest())

  // 因为font下面我们只需要把SVG去处理
const font = () => src('src/assets/fonts/**', { base: 'src' })
  .pipe(imagemin())
  .pipe(dest('dist'))

const basic = parallel(style, script, templ, image, font)
module.exports = {
  basic
}
