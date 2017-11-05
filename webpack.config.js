const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: isDev ?
    [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './client/index.js'
    ] : './client/index.js',
  output: {
    publicPath: '/assets/',
    path: __dirname + '/public/assets',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$|\.ttf?|\.woff$|\.woff2|\.eof|\.eot/,
        loader: 'file-loader'
      }
    ]
  },
  // When we're in development, we can use this handy live-reload plugin
  // to refresh the page for us every time we make a change to our client-side
  // files. It's like `nodemon` for the front end!
  plugins: isDev ? [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ] : []
};
