import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './public/main.css';

import configureStore from './src/store';
import Root from './src/Root';


const store = configureStore();

try {
  injectTapEventPlugin();
} catch (err) {
  // Ignore this error. Already injected.
}

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
