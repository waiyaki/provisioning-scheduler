import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { selectors as authSelectors } from '../../redux/modules/auth';
import {
  selectors as schedulerSelectors, fetchTasks
} from '../../redux/modules/scheduler';

import {
  createTask, selectors as tasksSelectors
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
    const { createTask: onSubmit, scheduler, tasks } = this.props;
    return (
      <Scheduler {...{ onSubmit, scheduler, tasks }} />
    );
  }
}

SchedulerContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  createTask: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  error: PropTypes.object,
  scheduler: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired
};

const { getAuth } = authSelectors;
const { getScheduler } = schedulerSelectors;
const { getTasks } = tasksSelectors;

export default connect(
  state => ({
    auth: getAuth(state),
    scheduler: getScheduler(state),
    tasks: getTasks(state)
  }),
  { createTask, fetchTasks }
)(SchedulerContainer);
