const { merge } = require('webpack-merge');
const progressbarWebpack = require('progress-bar-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpackConfigBase = require('./webpack.base.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(webpackConfigBase, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      threshold: 8192,
      algorithm: "gzip",
    }),
    new progressbarWebpack(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
});