const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  NODE_ENV,
  PORT,
  HOST
} = process.env;
const SRC = path.resolve(__dirname, 'src_old');
const OUTPUT = path.resolve(__dirname, 'www');
const __DEV__ = NODE_ENV === 'dev';
// const __TEST__ = NODE_ENV === 'test';
const __PROD__ = NODE_ENV === 'production';

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
    filename: `assets/js/[name]${__DEV__ ? '' : '.[hash]'}.js`,
  },
  resolve: {
    alias: {
      app: `${SRC}/app`
    },
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: OUTPUT,
    historyApiFallback: true,
    noInfo: true,
    port: PORT || '3000',
    host: HOST || '127.0.0.1'
  },
  plugins: [
    new ExtractTextPlugin(`assets/styles/styles${__DEV__ ? '' : '.[contenthash]'}.css`),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`
      }
    }),
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
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  }
};
