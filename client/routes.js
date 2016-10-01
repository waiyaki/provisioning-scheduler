import React, { PropTypes } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import {
  SchedulerContainer, LoginContainer, RegisterContainer,
  VerifyAccountContainer
} from './containers';
import { LandingPage } from './components';
import { selectors as authSelectors } from './redux/modules/auth';

const { getAuth, getUser } = authSelectors;
const requireAuth = store => (nextState, replace) => {
  const state = store.getState();
  const { isAuthenticated } = getAuth(state);
  const user = getUser(state);
  if (!isAuthenticated) {
    replace('/welcome');
  } else if (isAuthenticated && user && user.isPending) {
    replace('/verify');
  }
};

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute
          component={SchedulerContainer}
          onEnter={requireAuth(store)}
        />
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/welcome' component={LandingPage} />
        <Route path='/verify(/:token)' component={VerifyAccountContainer} />
      </Route>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object
};

export default Routes;
