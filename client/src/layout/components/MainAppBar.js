import React from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const MainAppBar = (props) => (
  <AppBar
    iconElementRight={
      props.isAuthenticated
      ? <FlatButton onClick={() => props.logout()} label='Logout' />
      : null
    }
    onClick={() => browserHistory.push('/')}
    title='Provisioning Scheduler'
  />
);

MainAppBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired
};

export default MainAppBar;
