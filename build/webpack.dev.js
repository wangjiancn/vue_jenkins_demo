const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'inline-cheap-source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    proxy: {
      '/django/**': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        pathRewrite: { '^/django': '' },
      },
    },
    // disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
})
