const TerserPlugin = require("terser-webpack-plugin");
const { resolve } = require('path');

module.exports = {
  entry: {
    'mkcvs': ['./index.js'],
  },
  output: {
    filename: '[name].min.js',
    chunkFilename: '[name].min.js',
    library: 'mkcvs',
    libraryTarget: 'umd',
    globalObject: 'window',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      extractComments: false
    })],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
      }
    ]
  },
  resolve: {
    alias: {
      // '@img': resolve(__dirname, './src/img'),
      // '@font': resolve(__dirname, './src/font')
    }
  },
  plugins: [

  ]
}