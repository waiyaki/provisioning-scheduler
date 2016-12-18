import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TaskForm from '../Tasks/TaskForm';

import { createTask } from '../../redux/modules/tasks';

const CreateTask = ({ onSubmit }) => (
  <Card>
    <CardTitle
      className='text-center'
      title='Schedule a New Task'
    />
    <Divider />
    <CardText>
      <TaskForm onSubmit={onSubmit} />
    </CardText>
  </Card>
);

CreateTask.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    onSubmit: data => createTask(data)(dispatch)
      .then(({ data: { id: taskId } }) => {
        browserHistory.push(`/tasks/${taskId}`);
      })
  })
)(CreateTask);
