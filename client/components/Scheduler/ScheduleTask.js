import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import ScheduleTaskForm from './ScheduleTaskForm';

const ScheduleTask = ({ onSubmit, tasks }) => (
  <Card zDepth={0}>
    <CardTitle
      className='text-xs-center'
      title='Schedule a New Task'
    />
    <Divider />
    <CardText>
      <ScheduleTaskForm {...{ onSubmit, tasks }} />
    </CardText>
  </Card>
);

ScheduleTask.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  tasks: React.PropTypes.object
};

export default ScheduleTask;
