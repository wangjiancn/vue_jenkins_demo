const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理目录

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'],
    }), //清理dist目录,忽略.gitkeep
    new HtmlWebpackPlugin({
      title: 'Blog', // 输出到dist/index.html的title
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      { test: /\.svg$/, use: ['raw-loader'] },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.postcss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 10000,
              publicPath: 'static/imgs/',
              outputPath: 'static/imgs/',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name]-[hash:5].min.[ext]',
          limit: 10000,
          publicPath: 'static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    ],
  },
}
