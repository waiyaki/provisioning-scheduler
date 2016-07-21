const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const publicPath = path.resolve(__dirname, './client/dist');

const app = express();

// Configure webpack hot reloading
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get('*', (req, res) => res.sendFile(
  path.resolve(__dirname, 'client/dist/index.html')
));

module.exports = app;
