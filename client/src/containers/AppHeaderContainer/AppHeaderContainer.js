import React from 'react';
import { connect } from 'react-redux';

import AppHeader from '../../components/MainAppBar/MainAppBar';
import { logout } from '../../actions/authActions';

// eslint-disable-next-line react/prefer-stateless-function
export class AppHeaderContainer extends React.Component {
  render() {
    return (
      <AppHeader
        isAuthenticated={this.props.auth.isAuthenticated}
        logout={this.props.logout}
      />
    );
  }
}

AppHeaderContainer.propTypes = {
  auth: React.PropTypes.shape({
    isAuthenticated: React.PropTypes.bool.isRequired
  }).isRequired,
  logout: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;

  return {
    auth
  };
};

export default connect(mapStateToProps, {
  logout
})(AppHeaderContainer);
