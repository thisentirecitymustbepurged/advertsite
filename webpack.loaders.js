module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loaders: ['react-hot-loader/webpack', 'babel-loader']
  },
  {
    test: /\.css$/, loader: 'style-loader!css-loader'
  },
  {
    test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'file-loader?name=assets/styles/[name].[ext]'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&name=assets/styles/[name].[ext]&mimetype=application/octet-stream'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&name=assets/styles/[name].[ext]&mimetype=image/svg+xml'
  },
  {
    test: /\.gif/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&name=assets/styles/[name].[ext]&mimetype=image/gif'
  },
  {
    test: /\.jpg/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&name=assets/styles/[name].[ext]&mimetype=image/jpg'
  },
  {
    test: /\.png/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&name=assets/styles/[name].[ext]&mimetype=image/png'
  },
  {
    test: /\.html$/,
    loader: 'raw-loader?minimize=false'
  }
];
