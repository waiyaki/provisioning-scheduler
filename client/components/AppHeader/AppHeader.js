import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import styles from './appHeaderStyles.css';
const inlineStyles = {
  appHeader: {
    position: 'fixed',
    top: 0,
    left: 0
  }
};

const AppHeader = ({ auth, logout, toggleDrawer, navigate }) => (
  <AppBar
    className={styles.appHeader}
    title={
      <Link to='/tasks' className={styles['link-header']}>
        Provisioning Scheduler
      </Link>
    }
    iconElementRight={auth.isAuthenticated
      ?
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {auth.user && auth.user.isAdmin && (
          <MenuItem
            primaryText='Admin Dashboard'
            onTouchTap={() => navigate('/dashboard/', false)}
          />
        )}
        <MenuItem primaryText='Sign out' onTouchTap={logout} />
      </IconMenu>
      :
      <FlatButton
        label='Login'
        onTouchTap={() => navigate('/login', false)}
      />
    }
    onLeftIconButtonTouchTap={toggleDrawer}
    style={inlineStyles.appHeader}
    showMenuIconButton={auth.isAuthenticated}
  />
);

AppHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

export default AppHeader;
