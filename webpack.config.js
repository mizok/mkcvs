const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    'index': ['./lib.js'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: 'mkcvs',
    libraryTarget: 'umd',
    globalObject: 'window',
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