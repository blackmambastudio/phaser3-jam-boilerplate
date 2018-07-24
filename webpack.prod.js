const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MinifyPlugin = require('babel-minify-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MinifyPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ])
  ]
})