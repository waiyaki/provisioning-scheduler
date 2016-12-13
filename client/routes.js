import React, { PropTypes } from 'react';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import { SchedulerActions, CreateTask, Scheduler } from './components';
import {
  SchedulerContainer, LoginContainer, RegisterContainer,
  VerifyAccountContainer, LandingPageContainer, TaskDetailsContainer,
  EditTask
} from './containers';

import { TaskDetailsDialog } from './components/admin';
import {
  AdminPageContainer, TasksContainer
} from './containers/admin';

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

const requireAdmin = store => (nextState, replace) => {
  const state = store.getState();
  const user = getUser(state);

  if (!(user && user.isAdmin)) {
    replace('/welcome');
  }
};

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='/welcome' />
        <Route component={SchedulerContainer} onEnter={requireAuth(store)}>
          <Route component={Scheduler}>
            <Route component={SchedulerActions} path='/tasks' />
            <Route component={CreateTask} path='/tasks/create' />
            <Route component={TaskDetailsContainer} path='/tasks/:taskId' />
            <Route component={EditTask} path='/tasks/:taskId/edit' />
          </Route>
          <Route
            component={AdminPageContainer}
            onEnter={requireAdmin(store)}
          >
            <Route component={TasksContainer} path='/dashboard'>
              <Route component={TaskDetailsDialog} path='tasks/:id' />
            </Route>

          </Route>
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
