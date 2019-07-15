const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'inline-cheap-source-map',
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'],
    // }), //清理dist目录,忽略.gitkeep
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/static/**': {
        target: 'http://127.0.0.1:8000',
      },
    },
    // disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
})
