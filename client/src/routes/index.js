import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';

import MainAppContainer from '../containers/MainAppContainer';
import Homepage from '../containers/HomeContainer/HomeContainer';
import Register from '../components/Auth/Register';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={MainAppContainer} path='/'>
      <IndexRoute component={Homepage} />
      <Route component={Register} path='/register' />
    </Route>
  </Router>
);

export default Routes;
