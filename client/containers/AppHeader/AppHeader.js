import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { AppHeader, AppDrawer } from '../../components';
import { selectors as authSelectors } from '../../redux/modules/auth';
import { logout } from '../../redux/modules/reducer';

class AppHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  navigate(to, changeDrawerState = true) {
    if (changeDrawerState) {
      this.toggleDrawer();
    }
    browserHistory.push(to);
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <AppHeader
          auth={auth}
          logout={this.props.logout}
          toggleDrawer={this.toggleDrawer}
          navigate={this.navigate}
        />
        {auth.isAuthenticated && (
          <AppDrawer
            open={this.state.drawerOpen}
            onRequestChange={this.toggleDrawer}
            navigate={this.navigate}
          />
        )}
      </div>
    );
  }
}

AppHeaderContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: authSelectors.getAuth(state)
  }),
  { logout }
)(AppHeaderContainer);
