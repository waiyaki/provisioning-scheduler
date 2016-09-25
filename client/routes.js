import React, { PropTypes } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import { SchedulerContainer, LoginContainer } from './containers';

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={SchedulerContainer} />
        <Route path='/login' component={LoginContainer} />
      </Route>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object
};

export default Routes;
