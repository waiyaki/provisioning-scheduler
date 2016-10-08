import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { selectors as authSelectors } from '../../redux/modules/auth';
import {
  createTask, fetchTasks, selectors as tasksSelectors
} from '../../redux/modules/tasks';

import { Scheduler } from '../../components';

class SchedulerContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { isAuthenticated } } = nextProps;
    if (!isAuthenticated) {
      browserHistory.push('/welcome');
    }
  }

  render() {
    const { createTask: onSubmit, tasks } = this.props;
    return (
      <Scheduler {...{ onSubmit, tasks }} />
    );
  }
}

SchedulerContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  createTask: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.object.isRequired
};

const { getAuth } = authSelectors;
const { getTasks } = tasksSelectors;

export default connect(
  state => ({
    auth: getAuth(state),
    tasks: getTasks(state)
  }),
  { createTask, fetchTasks }
)(SchedulerContainer);
