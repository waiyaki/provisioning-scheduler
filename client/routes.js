import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import App from './App';
import SchedulerContainer from './containers';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={SchedulerContainer} />
    </Route>
  </Router>
);

export default Routes;
