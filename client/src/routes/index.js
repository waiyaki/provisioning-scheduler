import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';

import MainAppContainer from '../containers/MainAppContainer';
import Homepage from '../containers/HomeContainer/HomeContainer';

import auth from '../auth';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={MainAppContainer} path='/'>
      <IndexRoute component={Homepage} />
      <Route component={auth.components.Register} path='/register' />
      <Route component={auth.components.Login} path='/login' />
      <Route
        component={auth.containers.UnverifiedAccountContainer}
        path='/verify(/:token)'
      />
    </Route>
  </Router>
);

export default Routes;
