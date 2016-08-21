import React from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';

const MainAppBar = () => (
  <AppBar
    onClick={() => browserHistory.push('/')}
    title='Provisioning Scheduler'
  />
);

export default MainAppBar;
