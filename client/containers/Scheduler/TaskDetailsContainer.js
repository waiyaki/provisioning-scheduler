import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import delay from 'lodash/delay';

import CircularProgress from 'material-ui/CircularProgress';

import { fetchTask, selectors } from '../../redux/modules/tasks';
import { TaskDetails, FetchTaskError } from '../../components';
import { getComponent } from '../../utils';

class TaskDetailsContainer extends Component {
  componentDidMount() {
    const { params: { taskId } } = this.props;
    // Delaying this fetch to allow `fetchTasks` to be dispatched first.
    // We don't refetch data if `fetchTasks` has already fetched.
    delay(() => this.props.fetchTask(taskId), 1000);
  }

  render() {
    const { task, isFetching, tasks } = this.props;
    return getComponent(
      <div className='text-center'>
        <CircularProgress />
      </div>,
      getComponent(
        <FetchTaskError error={tasks.error} />,
        <TaskDetails task={task} />,
        [tasks.error && tasks.error.taskFetchError]
      ),
      [isFetching]
    );
  }
}

TaskDetailsContainer.propTypes = {
  fetchTask: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    taskId: PropTypes.string.isRequired
  }).isRequired,
  task: PropTypes.object,
  tasks: PropTypes.object.isRequired
};

const { getItemById, getPropFromTasks, getTasks } = selectors;
export default connect(
  (state, ownProps) => ({
    tasks: getTasks(state),
    task: getItemById(ownProps.params.taskId, state),
    isFetching: getPropFromTasks('isFetching', state)
  }),
  { fetchTask }
)(TaskDetailsContainer);
