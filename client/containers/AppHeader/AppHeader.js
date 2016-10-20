import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { AppHeader } from '../../components';
import { selectors as authSelectors } from '../../redux/modules/auth';
import { logout } from '../../redux/modules/reducer';

class AppHeaderContainer extends Component {
  render() {
    const { auth } = this.props;
    return (
      <AppHeader auth={auth} logout={this.props.logout} />
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
