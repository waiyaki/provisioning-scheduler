import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import './public/main.css';

import configureStore from './src/store';
import Root from './src/containers/Root';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
