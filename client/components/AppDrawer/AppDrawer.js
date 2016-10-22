import React, { PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home';
import Create from 'material-ui/svg-icons/content/create';
import AppBar from 'material-ui/AppBar';

const AppDrawer = ({ open, onRequestChange, navigate }) => (
  <Drawer
    docked={false}
    open={open}
    onRequestChange={onRequestChange}
  >
    <AppBar title='Provisioning Scheduler' showMenuIconButton={false} />
    <Menu>
      <MenuItem
        primaryText='Home'
        leftIcon={<Home />}
        onTouchTap={() => navigate('/tasks')}
      />
      <Divider />
      <MenuItem
        primaryText='New Task'
        leftIcon={<Create />}
        onTouchTap={() => navigate('/tasks/create')}
      />
      <Divider />
    </Menu>
  </Drawer>
);

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  onRequestChange: PropTypes.func.isRequired
};

export default AppDrawer;
