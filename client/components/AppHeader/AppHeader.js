import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import styles from './appHeaderStyles.css';
const inlineStyles = {
  appHeader: {
    position: 'fixed',
    top: 0,
    left: 0
  }
};

const AppHeader = ({ auth, logout }) => (
  <AppBar
    className={styles.appHeader}
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
    style={inlineStyles.appHeader}
  />
);

AppHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppHeader;
