import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const AppHeader = ({ auth, logout }) => (
  <AppBar
    title='Provisioning Scheduler'
    iconElementRight={auth.isAuthenticated
      ? <FlatButton
        label='Logout'
        onTouchTap={logout}
      />
      : <FlatButton
        label='Login'
        onTouchTap={() => browserHistory.push('/login')}
      />
    }
  />
);

AppHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppHeader;
