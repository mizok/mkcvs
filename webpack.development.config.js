const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    index: ['./test/test.ts', './test/test.scss']
  },
  target: 'web',
  output: {
    filename: 'dist/[name].js',
    chunkFilename: '[name].min.js',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    open: true,
    compress: true,
    hot: false,
    liveReload: true
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
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('postcss-preset-env')()
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(otf|eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name][ext]'
        }
      }

    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: `./index.html`,
      template: './test/test.html'
    }),

  ]
}