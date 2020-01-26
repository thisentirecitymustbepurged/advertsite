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

const SRC = path.resolve(__dirname, 'src');
const OUTPUT = path.resolve(__dirname, 'www');
const DEV = NODE_ENV === 'dev';
// const TEST = NODE_ENV === 'test';
const PROD = NODE_ENV === 'production';

module.exports = {
  watch: DEV,
  devtool: DEV ? 'cheap-module-source-map' : false,
  cache: true,
  entry: {
    main: ['babel-polyfill', `${SRC}/main`]
  },
  output: {
    path: OUTPUT,
    publicPath: '/',
    filename: `assets/js/[name]${DEV ? '' : '.[hash]'}.js`,
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
    new ExtractTextPlugin(`assets/styles/styles${DEV ? '' : '.[contenthash]'}.css`),
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
    ...(PROD
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
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'url-loader'
        ]
      },
      ...(PROD
        ? [
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
          }
        ]
        : [
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      )
    ]
  }
};
