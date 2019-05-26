const webpack = require('webpack')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  output: {
    path: '/home/wangj/PycharmProjects/DjangoForBlog/blog/dist/',
    filename: 'static/js/[name].[hash].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin(), // UglifyJSPlugin 不支持es6,
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Blog', // 输出到dist/index.html的title
      template: 'src/index.html',
      filename: 'templates/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
})
