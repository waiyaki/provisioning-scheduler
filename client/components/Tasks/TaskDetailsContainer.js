import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import { selectors } from '../../redux/modules/tasks';
import { TaskDetails, FetchTaskError } from '../../components';
import { getComponent } from '../../utils';

const transforms = [{
  fields: ['createdAt', 'updatedAt'],
  renderAs: dateString => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  }
}];

const TaskDetailsContainer = ({ task, isFetching, tasks }) =>
  getComponent(
    <div className='text-center'>
      <CircularProgress />
    </div>,
    getComponent(
      <FetchTaskError error={tasks.error} />,
      <TaskDetails task={task} transforms={transforms} />,
      [tasks.error && tasks.error.taskFetchError]
    ),
    [isFetching]
  );

TaskDetailsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    taskId: PropTypes.string.isRequired
  }).isRequired,
  task: PropTypes.object,
  tasks: PropTypes.object.isRequired
};

const { getItemById, getPropFromTasks, getTasks } = selectors;

export default connect(
  (state, { params: { taskId } }) => ({
    tasks: getTasks(state),
    task: getItemById(taskId, state),
    isFetching: getPropFromTasks('isFetching', state)
  })
)(TaskDetailsContainer);
