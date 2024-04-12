const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  mode,
  plugins,
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    hot: true,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    open: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
    chunkFilename: '[id].js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: {loader: 'babel-loader', options: {presets: ['@babel/preset-env', '@babel/preset-react']}}},
      { test: /\.tsx$/, exclude: /node_modules/, use: ['ts-loader']},
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
