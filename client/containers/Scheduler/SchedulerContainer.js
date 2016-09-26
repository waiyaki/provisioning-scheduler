import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { selectors as authSelectors } from '../../redux/modules/auth';

const { getAuth } = authSelectors;

class SchedulerContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { auth: { isAuthenticated } } = nextProps;
    if (!isAuthenticated) {
      browserHistory.push('/welcome');
    }
  }

  render() {
    return (
      <h2>SchedulerContainer Contents</h2>
    );
  }
}

SchedulerContainer.propTypes = {
  auth: React.PropTypes.object.isRequired
};

export default connect(
  state => ({ auth: getAuth(state) })
)(SchedulerContainer);
