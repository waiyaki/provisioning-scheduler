import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';

import MainAppContainer from '../containers/MainAppContainer';
import Homepage from '../containers/HomeContainer/HomeContainer';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={MainAppContainer} path='/'>
      <IndexRoute component={Homepage} />
    </Route>
  </Router>
);

export default Routes;
