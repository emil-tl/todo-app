const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const base = require('./base');

const pjson = require(path.resolve(__dirname, '../package.json'));

module.exports = merge(base, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: [
      path.resolve(__dirname, '../')],
    watchContentBase: true,
    compress: true,
    host: 'localhost',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
    open: true,
    overlay: {warnings: false, errors: true},
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: '$is-production: false;\n',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
