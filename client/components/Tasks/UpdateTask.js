import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TaskForm from '../Tasks/TaskForm';

const UpdateTask = ({ onSubmit, tasks, task = {}, ...rest }) => (
  <Card zDepth={0}>
    <CardTitle
      className='text-center'
      title={`Update Task ${task.activity || ''}`}
    />
    <Divider />
    <CardText>
      <TaskForm {...{ onSubmit, tasks, initialValues: task, ...rest }} />
    </CardText>
  </Card>
);

UpdateTask.propTypes = {
  onSubmit: React.PropTypes.func,
  tasks: React.PropTypes.object,
  task: React.PropTypes.object
};

export default UpdateTask;
