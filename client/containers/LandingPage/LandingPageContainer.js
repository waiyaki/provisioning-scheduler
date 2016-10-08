import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { LandingPage } from '../../components';
import { selectors } from '../../redux/modules/auth';

class LandingPageContainer extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      browserHistory.replace('/tasks');
    }
  }
  render() {
    return (
      <LandingPage />
    );
  }
}

LandingPageContainer.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  state => ({ auth: selectors.getAuth(state) })
)(LandingPageContainer);
