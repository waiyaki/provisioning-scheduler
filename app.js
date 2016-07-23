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
const router = express.Router(); // eslint-disable-line new-cap

// Log here so that all requests are logged.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(require('./server/routes')(router));

// Configure webpack hot reloading
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => res.sendFile(
  path.resolve(__dirname, 'client/dist/index.html')
));

module.exports = app;
