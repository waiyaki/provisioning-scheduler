import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import { fetchTask, selectors } from '../../redux/modules/tasks';
import { TaskDetails } from '../../components';
import { getComponent } from '../../utils';

class TaskDetailsContainer extends Component {
  componentDidMount() {
    const { params: { taskId } } = this.props;
    this.props.fetchTask(taskId);
  }

  render() {
    const { task, isFetching } = this.props;
    return getComponent(
      <div className='text-center'>
        <CircularProgress />
      </div>,
      <TaskDetails task={task} />,
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
  task: PropTypes.object
};

const { getItemById, getPropFromTasks } = selectors;
export default connect(
  (state, ownProps) => ({
    task: getItemById(ownProps.params.taskId, state),
    isFetching: getPropFromTasks('isFetching', state)
  }),
  { fetchTask }
)(TaskDetailsContainer);
