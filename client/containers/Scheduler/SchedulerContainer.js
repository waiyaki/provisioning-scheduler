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
    const { createTask: onSubmit, tasks, items, children } = this.props;
    return (
      <Scheduler {...{ onSubmit, tasks, items, children }} />
    );
  }
}

SchedulerContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.element,
  createTask: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  error: PropTypes.object,
  items: PropTypes.array.isRequired,
  tasks: PropTypes.object.isRequired
};

const { getAuth } = authSelectors;
const { getTasks, getItems } = tasksSelectors;

export default connect(
  state => ({
    auth: getAuth(state),
    tasks: getTasks(state),
    items: getItems(state)
  }),
  { createTask, fetchTasks }
)(SchedulerContainer);
