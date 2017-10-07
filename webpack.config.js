const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaders = require('./webpack.loaders');

const {
  NODE_ENV,
  PORT,
  HOST
} = process.env;
const SRC = path.resolve(__dirname, 'src');
const OUTPUT = path.resolve(__dirname, 'www');
const __DEV__ = NODE_ENV === 'dev';
// const __TEST__ = NODE_ENV === 'test';
const __PROD__ = NODE_ENV === 'production';
const hash = __DEV__ ? '' : '.[hash]';

module.exports = {
  watch: __DEV__,
  devtool: __DEV__ ? 'cheap-module-source-map' : false,
  cache: true,
  entry: {
    main: ['babel-polyfill', `${SRC}/main`]
  },
  output: {
    path: OUTPUT,
    publicPath: '/',
    filename: `assets/js/[name]${hash}.bundle.js`,
  },
  resolve: {
    alias: {
      app: `${SRC}/app`
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: OUTPUT,
    historyApiFallback: true,
    noInfo: true,
    port: PORT || '3000',
    host: HOST || '127.0.0.1'
  },
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
  ]
};
