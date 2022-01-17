const {merge} = require('webpack-merge');
const path = require('path')
const progressbarWebpack = require('progress-bar-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpackConfigBase = require('./webpack.base.config');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = merge(webpackConfigBase, {
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[hash:5].js',
    chunkFilename: 'js/[name].[hash:5].js',
    publicPath: '/auth',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      threshold: 8192,
      algorithm: "gzip",
    }),
    new progressbarWebpack(),
    new HtmlWebpackPlugin({
      template: resolve('../index.html'),
      baseName: '/auth'
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
});