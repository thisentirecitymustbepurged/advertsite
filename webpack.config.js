const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaders = require('./webpack.loaders');

const SRC = path.resolve(__dirname, 'src');
const OUTPUT = path.resolve(__dirname, 'www');

const env = process.env.NODE_ENV || 'dev';

const __DEV__ = env === 'dev';
const __TEST__ = env === 'test';
const __PROD__ = env === 'production';

const hash = __DEV__ ? '' : '.[hash]';

module.exports = {
  watch: __DEV__,
  devtool: __DEV__ ? 'cheap-module-source-map' : false,
  cache: true,
  entry: {
    main: ['./src/main']
  },
  output: {
    path: OUTPUT,
    publicPath: '/',
    filename: `assets/js/[name]${hash}.bundle.js`,
    chunkFilename: 'assets/js/[id].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // externals: {
  //   cheerio: 'window',
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': true
  // },
  plugins: [
    new ExtractTextPlugin('assets/styles/styles.scss'),

    new CopyWebpackPlugin(
      [
        {
          from: 'src/assets/images',
          to: 'assets/images'
        }
      ],
      {
        copyUnmodified: true
      }
    ),

    new HtmlWebpackPlugin({
      template: `${SRC}/index.html`,
      filename: 'index.html',
      inject: 'body'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __DEV__,
      __TEST__,
      __PROD__
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/vendor.bundle.js'
    }),

    ...(__PROD__
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              screw_ie8: true
            },
            comments: false,
            sourceMap: false
          })
        ]
      : [])
  ],
  devServer: {
    contentBase: OUTPUT,
    historyApiFallback: true,
    noInfo: true,
    port: process.env.PORT || '3000',
    host: process.env.HOST || '127.0.0.1'
  },
  module: {
    loaders,
    noParse: [/.+zone\.js\/dist\/.+/]
  }
};
