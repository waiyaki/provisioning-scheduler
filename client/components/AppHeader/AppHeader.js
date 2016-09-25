import React, { PropTypes } from 'react';

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
      : null
    }
  />
);

AppHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppHeader;
