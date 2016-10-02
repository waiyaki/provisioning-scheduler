import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import styles from './appHeaderStyles.css';

const AppHeader = ({ auth, logout }) => (
  <AppBar
    title={
      <Link to='/' className={styles['link-header']}>
        Provisioning Scheduler
      </Link>
    }
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
