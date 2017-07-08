const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./app/index",
  output: {
    path: __dirname + "./public",
    filename: "bundle.js"
  },  
  resolve: {
     extensions: [ '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],          
        }
      }
    ]
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: debug ? 
    []:
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};