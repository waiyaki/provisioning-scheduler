import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TaskForm from '../Tasks/TaskForm';

const CreateTask = ({ onSubmit, tasks }) => (
  <Card>
    <CardTitle
      className='text-center'
      title='Schedule a New Task'
    />
    <Divider />
    <CardText>
      <TaskForm {...{ onSubmit, tasks }} />
    </CardText>
  </Card>
);

CreateTask.propTypes = {
  onSubmit: React.PropTypes.func,
  tasks: React.PropTypes.object
};

export default CreateTask;
