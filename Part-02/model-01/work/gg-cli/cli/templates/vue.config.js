const gitSha = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
const SentryPlugin = require('@sentry/webpack-plugin')
process.env.RELEASE_VERSION = gitSha
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const injectDllToHtml = require('add-asset-html-webpack-plugin')

const devServerPort = 9802
//webpack配置
module.exports = {
  publicPath: '/',
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/development': {
        target: '<%= development %>/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/development': ''
        }
      },
      '/api': {
        target: '<%= development %>/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '' //路径重写
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        'console.log'
      ]
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      })
      new injectDllToHtml({
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        publicPath: './vendor',
        outputPath: './vendor'
      })
    }
  },

  chainWebpack: config => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.VUE_APP_SENTRY !== 'false'
    ) {
      config.plugin('sentry').use(SentryPlugin, [
        {
          ignore: ['node_modules'],
          include: './dist',
          configFile: './.sentryclirc',
          release: process.env.RELEASE_VERSION, // version
          deleteAfterCompile: true
        }
      ])
    }
    // generate sourceMap file
    config.entry('main').add('babel-polyfill')
    // compress image
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true, disable: true })
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // compress
      config.optimization.minimize(true)
      // buddleing spliting
      config.optimization.splitChunks({
        chunks: 'all'
      })
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })
      )
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/encapsulation.less')]
    }
  }
}
