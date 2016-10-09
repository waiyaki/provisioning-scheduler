import React, { PropTypes } from 'react';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import {
  SchedulerContainer, LoginContainer, RegisterContainer,
  VerifyAccountContainer, LandingPageContainer, TaskDetailsContainer
} from './containers';
import { SchedulerActions, ScheduleTask } from './components';
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
        <IndexRedirect to='/welcome' />
        <Route component={SchedulerContainer} onEnter={requireAuth(store)}>
          <Route component={SchedulerActions} path='/tasks' />
          <Route component={ScheduleTask} path='/tasks/create' />
          <Route component={TaskDetailsContainer} path='/tasks/:taskId' />
        </Route>
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/welcome' component={LandingPageContainer} />
        <Route path='/verify(/:token)' component={VerifyAccountContainer} />
      </Route>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object
};

export default Routes;
