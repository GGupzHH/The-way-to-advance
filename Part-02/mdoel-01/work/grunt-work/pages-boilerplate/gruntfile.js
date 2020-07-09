const sass = require('sass')
const fs = require('fs')
const useref = require('useref')
const loadGruntTasks = require('load-grunt-tasks')
const browserSync = require('browser-sync')
const bs = browserSync.create()

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
module.exports = grunt => {
  grunt.initConfig({
    clean: ['dist/**'],

    sass: {
      options: {
        sourceMap: true,
        implementation: sass, // implementation指定在grunt-sass中使用哪个模块对sass进行编译，我们使用npm中的sass
      },
      main: {
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
        }
      }
    },

    script: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: true
      },
      main: {
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },

    web_swig: {
      options: {
        swigOptions: {
          cache: false
        },
        getData: function (tpl) {
          return data;
        }
      },
      main: {
        expand: true,
        cwd: 'src/',
        src: "**/*.html",
        dest: "dist/"
      },
    },

    uglify: {
      production: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['assets/scripts/*.js'],
          dest: 'dist/',
        }]
      },
      dev: {}
    },
    cssmin: {
      production: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['assets/styles/*.css'],
          dest: 'dist/',
        }]
      },
      dev: {}
    },
    htmlmin: {
      production: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*.html'],
          dest: 'dist/'
        }]
      },
      dev: {}
    },
    image: {
      production: {
        options: {
          optipng: false,
          pngquant: true,
          zopflipng: true,
          jpegRecompress: false,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['assets/fonts/*', 'assets/images/*'],
          dest: 'dist/'
        }]
      },
      dev: {}
    },
    eslint: {
      options: {
        rulePaths: ['src/assets/scripts/']
      },
      target: ['src/assets/scripts/main.js']
    },
    sasslint: {
      main: {
        options: {
          configFile: 'config/.sass-lint.yml',
          rulePaths: ['src/assets/scripts/']
        },
        target: ['src/assets/styles/main.scss']
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**'],
          dest: 'dist/'
        },
        {
          expand: true,
          cwd: 'src',
          src: ['assets/fonts/*'],
          dest: 'dist/'
        },
        {
          expand: true,
          cwd: 'src',
          src: ['assets/images/*'],
          dest: 'dist/'
        }
      ]}
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['script', 'bs-reload']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass', 'bs-reload']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['web_swig', 'bs-reload']
      }
    },
    
    ghDeploy: {
      options: {
        repository: 'https://github.com/2604150210/pages-boilerplate-grunt.git',
        deployPath: 'dist',
       	branch: grunt.option('branch') || 'gh-pages',
    	  message: 'Auto deplyment ' + grunt.template.today()
    },
    }
  })

  grunt.registerTask("jal-useref", function () {
    const done = this.async()
    const cwd = 'dist/'
    const htmls = ['index.html', 'about.html']
    htmls.forEach((html, index) => {
      const inputHtml = fs.readFileSync(cwd + html, "utf8")
      const [code, result] = useref(inputHtml)
      for (let type in result) {
        const dests = Object.keys(result[type])
        dests.forEach(dest => {
          const src = result[type][dest].assets
          let read
          const files = src.map(file => {
            read = cwd + file
            if(file[0] === '/') {
              read = file.substr(1)
            }
            return fs.readFileSync(read)
          })
          fs.writeFile(cwd + dest, files.join(''), (err) => {
            if (err) {
                return console.error(err);
            }
          })
        })
      }
      fs.writeFile(cwd + html, code, (err) => {
        if (err) {
          return console.error(err);
        }
        if(index === htmls.length - 1) {
          done()
        }
      })
    })
  })

  // 启动browserSync
  grunt.registerTask("bs", function () {
    const done = this.async();
    bs.init({
      notify: false,
      port: grunt.option('port') || 2080,
      open: grunt.option('open'),
      // files: 'temp/**',
      server: {
        baseDir: ['dist', 'src', 'public'], // 按顺序查找
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    }, function (err, bs) {
      done();
    });
  })

  grunt.registerTask("bs-reload", function () {
    bs.reload()
  })

  loadGruntTasks(grunt) // 自动加载所有的grunt插件中的任务

  // 根据命令行参数判断是否需要压缩
  grunt.registerTask('mini', ['image', 'uglify', 'cssmin', 'htmlmin'])

  grunt.registerTask('basic', ['sass', 'script', 'web_swig'])

  grunt.registerTask('serve', ['basic', 'bs', 'watch'])

  grunt.registerTask('build', ['clean', 'basic', 'copy', 'jal-useref', `mini`])
}
