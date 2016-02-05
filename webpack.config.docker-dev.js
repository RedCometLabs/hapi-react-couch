var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://192.168.99.100:8080', //Creating a small node/express server
    'webpack/hot/only-dev-server', //So that we can use hot-loading
    './client/index.jsx' //Our starting point for our development.
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'] //We can use .js and React's .jsx files using Babel
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js' //All our code is compiled into a single file called bundle.js
  },
  devServer: {
    contentBase: './public',
    hot: true,
    port: 8080
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() //Hot loading
  ]
};
