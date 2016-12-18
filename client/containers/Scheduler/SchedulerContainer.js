import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { selectors as authSelectors } from '../../redux/modules/auth';
import { fetchTasks } from '../../redux/modules/tasks';

class SchedulerContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { isAuthenticated }, location: { pathname } } = nextProps;
    if (!isAuthenticated && pathname !== '/welcome') {
      browserHistory.push('/welcome');
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

SchedulerContainer.propTypes = {
  children: PropTypes.element.isRequired,
  fetchTasks: PropTypes.func.isRequired
};


export default connect(
  state => ({
    auth: authSelectors.getAuth(state)
  }),
  { fetchTasks }
)(SchedulerContainer);
