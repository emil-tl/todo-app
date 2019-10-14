const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Options
const pagesArray = require('../src/pages-list'); // Pages array

function generateHtmlEntries() {
  const commonOptions = {
    inject: true,
    minify: false,
  };

  const links = { // TODO жуткий костыль
    home: 'index.html',
    ext: '.html',
  };

  return pagesArray.map((pageName) => {
    const pagePath = pageName === 'home' ? '' : `${pageName}/`;
    let fileName = '';
    if (process.env.NODE_ENV === 'production') {
      fileName = `${fileName}html/${pageName === 'home' ? 'index' : pageName}.html`;
    } else {
      links.home = '/';
      links.ext = '';
      fileName = `${pagePath}index.html`;
    }

    return new HtmlWebpackPlugin({
      ...links,
      ...commonOptions,
      template: `./src/html/${pagePath}index.ejs`,
      filename: fileName,
    });
  });
}

module.exports = {
  mode: 'development',
  entry: {
    context: path.resolve(__dirname, '../src'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { babelrc: true },
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-compiled-loader-webpack4',
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: 'assets/images/[name].[ext]',
          publicPath: '../',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: 'assets/media/[name].[ext]',
          publicPath: '../',
        },
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'url-loader',
        include: [
          path.resolve(__dirname, '../src/assets/fonts'),
        ],
        options: {
          limit: 10 * 1024,
          name: 'assets/fonts/[folder]/[name].[ext]',
          publicPath: '../',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        include: [
          path.resolve(__dirname, '../src/assets/svg'),
          path.join(__dirname, '..', 'node_modules/photoswipe'),
        ],
        options: {
          limit: 10 * 1024,
          name: 'assets/svg/[name].[ext]',
          noquotes: true,
          publicPath: '../',
        },
      },
    ],
  },
  resolve: {
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    ...generateHtmlEntries(),
  ],
};
