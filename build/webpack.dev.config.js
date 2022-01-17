const path = require('path');
const {merge} = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfigBase = require('./webpack.base.config');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = merge(webpackConfigBase, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[hash:5].js',
    chunkFilename: 'js/[name].[hash:5].js',
    publicPath: '/',
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|js)x?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'thread-loader',
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: true,
      //         include: path.join(__dirname, '../src'),
      //         plugins: ['react-refresh/babel'],
      //       }
      //     }
      //   ]
      // },
    ]
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public')
    },
    port: 8090,
    compress: true,
  }
});