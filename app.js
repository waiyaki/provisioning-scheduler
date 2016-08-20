const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const publicPath = path.resolve(__dirname, './client/dist');

const app = express();

const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.load();
}

// Log here so that all requests are logged.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// Configure webpack hot reloading
if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

require('./server/routes')(app); // require application routes.
app.get('*', (req, res) => res.sendFile(
  path.resolve(__dirname, 'client/dist/index.html')
));

module.exports = app;
