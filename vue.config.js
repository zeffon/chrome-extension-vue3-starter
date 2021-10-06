const CopyPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')

const copyFiles = [
  {
    from: path.resolve('src/chrome/manifest.json'),
    to: `${path.resolve('dist')}/manifest.json`
  },
  {
    from: path.resolve('src/assets'),
    to: path.resolve('dist/assets')
  },
  {
    from: path.resolve('src/chrome/inject.ts'),
    to: path.resolve('dist')
  }
]

const plugins = [
  new CopyPlugin({
    patterns: copyFiles
  })
]
// 生产环境打包dist为zip
if (process.argv.includes('--zip')) {
  plugins.push(
    new ZipPlugin({
      path: path.resolve('./'),
      filename: 'dist.zip'
    })
  )
}

// 页面
const pages = {}
const modules = ['popup']
// popup和devtool 模块都需要 html 文件

modules.forEach((name) => {
  pages[name] = {
    entry: `src/chrome/${name}/index.ts`,
    template: `src/chrome/${name}/index.html`,
    filename: `${name}.html`
  }
})

module.exports = {
  pages,
  // 生产环境不生成 sourceMap 文件
  productionSourceMap: false,

  configureWebpack: {
    entry: {
      content: './src/chrome/content/index.ts',
      background: './src/chrome/background/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins
  },
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve('src'))
    // 处理字体文件名，去除hash值
    const fontsRule = config.module.rule('fonts')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    fontsRule.uses.clear()
    fontsRule
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'fonts/[name].[ext]'
      })
  }
}
