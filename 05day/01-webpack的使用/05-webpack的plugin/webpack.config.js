const path = require('path')
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/'
  },
  module: {
    rules: [
    {
      test: /\.css$/,
      // css-loader只负责将css文件进行加载
      // style-loader负责将样式添加到DOM中
      // 使用多个loader时, 是从右向左
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.less$/,
      use: [{
        loader: "style-loader", // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader", // compiles Less to CSS
      }]
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [
      {
        loader: 'url-loader',
        options: {
          // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
          // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载.
          limit: 13000,
          name: 'img/[name].[hash:8].[ext]'
        },
      }]
    },
    {
      test: /\.js$/,
      // exclude: 排除
      // include: 包含
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    },
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
  },
  resolve: {
    // alias: 别名
    extensions: ['.js', '.css', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.BannerPlugin('最终版权归万馆所有'),
    // new uglifyJsPlugin(),// 压缩JS (运行时抽离)
  ],
  devServer: {// (开发中使用)
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
  }
}