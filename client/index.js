import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import once from 'lodash/once';

import Routes from './routes';
import createStore from './redux/store';
import { getAuthToken, parseUserFromToken } from './utils';
import './index.css';

const injectTap = once(injectTapEventPlugin);
injectTap();

const store = createStore({
  auth: {
    isAuthenticated: !!getAuthToken(),
    isFetching: false,
    user: parseUserFromToken()
  }
});

render(
  <AppContainer>
    <Routes store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require, no-shadow
    const Routes = require('./routes').default;
    render(
      <AppContainer>
        <Routes store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
