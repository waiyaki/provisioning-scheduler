import React from 'react';
import { connect } from 'react-redux';

import AppHeader from '../../components/MainAppBar/MainAppBar';
import auth from '../../auth';

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

const mapStateToProps = state => ({
  auth: auth.selectors.getAuth(state)
});

export default connect(mapStateToProps, {
  logout: auth.actions.logout
})(AppHeaderContainer);
