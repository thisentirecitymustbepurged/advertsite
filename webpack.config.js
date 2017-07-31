const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./app/index",
  output: {
    path: __dirname + "./public",
    filename: "bundle.js"
  },
  resolve: {
     extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015','stage-2'],
        }
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
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
      new Webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};