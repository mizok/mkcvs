const { resolve } = require('path');

module.exports = {
  entry: {
    main: ['./index.js'],
  },
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: '[name].min.js',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  mode: 'development',
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