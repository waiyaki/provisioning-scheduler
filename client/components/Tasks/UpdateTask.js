import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

import TaskForm from './TaskForm';
import FetchTaskError from './FetchTaskError';

import { updateTask, selectors } from '../../redux/modules/tasks';
import { getComponent } from '../../utils';

const UpdateTask = ({ onSubmit, task }) => (
  <Card>
    <CardTitle
      className='text-center'
      title={`Update Task ${task.activity || ''}`}
    />
    <Divider />
    <CardText>
      <TaskForm {...{ onSubmit, initialValues: task }} />
    </CardText>
  </Card>
);

const UpdateTaskIfPossible = ({ tasks, task, onSubmit }) =>
  getComponent(
    <div className='text-center'>
      <CircularProgress />
    </div>,
    getComponent(
      <FetchTaskError error={tasks.error} />,
      <UpdateTask task={task} onSubmit={onSubmit} />,
      [tasks.error && tasks.error.taskFetchError]
    ),
    [tasks.isFetching]
  );

UpdateTask.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  task: React.PropTypes.object.isRequired
};

UpdateTaskIfPossible.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  task: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.object.isRequired
};

UpdateTaskIfPossible.defaultProps = {
  task: {},
  params: {}
};

export default connect(
  (state, { params: { taskId } }) => ({
    tasks: selectors.getTasks(state),
    task: selectors.getItemById(taskId, state)
  }),
  (dispatch, { detailsBaseUrl = '/tasks/' }) => ({
    onSubmit: data => updateTask(data)(dispatch)
      .then(({ data: { id } }) => browserHistory.push(`${detailsBaseUrl}${id}`))
  })
)(UpdateTaskIfPossible);
