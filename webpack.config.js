const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const config = {
  devtool: 'eval-source-map',
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: path.join(__dirname, 'client')
    }]
  },
  resolve: ['', '.js', '.jsx'],
  postcss: () => [autoprefixer],
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.module.loaders = [
    ...config.module.loaders,
    {
      test: /\.css/,
      loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  ];
} else {
  config.entry = [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    ...config.entry
  ];
  config.module.loaders = [
    ...config.module.loaders,
    {
      test: /\.css?$/,
      loader: 'style!css?modules!postcss'
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = config;
