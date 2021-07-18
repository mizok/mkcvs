const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    'index': ['./index.ts'],
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
      terserOptions: {
        format: {
          comments: /@license|@return|@param/i,
        },
      },
      test: /\.js(\?.*)?$/i,
      extractComments: false
    })],
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },

          }
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}