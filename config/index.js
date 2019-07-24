// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../proBuild/index.html'),
        assetsRoot: path.resolve(__dirname, '../proBuild'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8000,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [
            '/youhui'
        ],//代理路径
        proxypath: 'http://www.aibaohe.cn',
        cssSourceMap: false
    }}