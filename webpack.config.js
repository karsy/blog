const webpack = require('webpack');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const sassExtract = new ExtractTextWebapckPlugin('css/sass.css');

module.exports = {
  devtool: 'source-map',

  entry: './src/app.js',

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, 'dist'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: 'bundle.js', // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    publicPath: '/' // string
    // 输出解析文件的目录，url 相对于 HTML 页面
  },

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3009'
    },
    host: 'localhost', // 主机地址
    port: 3000, // 端口号
    contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true // only errors & warns on hot reload
    // ...
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'json-loader'
      },
      {
        test: /\.css?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: ExtractTextWebapckPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.scss?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: sassExtract.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|otf)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    // 构建优化插件config.optimization.splitChunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor-[hash].min.js'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true // 压缩 去掉引号
      }
    }),
    new ExtractTextWebapckPlugin({
      filename: 'build.min.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],

  // optimization: {
  //   splitChunks: { // 提取公共模块

  //   }
  // },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    'react': 'var React',
    'react-dom': 'var ReactDOM'
  }
};
