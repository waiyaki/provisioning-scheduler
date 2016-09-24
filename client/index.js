import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import once from 'lodash/once';

import Routes from './routes';

const injectTap = once(injectTapEventPlugin);
injectTap();

render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require, no-shadow
    const App = require('./App').default;
    render(
      <AppContainer><App /></AppContainer>,
      document.getElementById('root')
    );
  });
}
