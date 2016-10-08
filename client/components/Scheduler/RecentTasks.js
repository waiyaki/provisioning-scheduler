import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Tasks from './Tasks';

const RecentTasks = ({ tasks }) => (
  <Card zDepth={0}>
    <CardTitle
      className='text-center'
      title="Today's Tasks"
    />
    <Divider />
    <CardText>
      {!tasks.items.length
        ? <h3 className='text-center'>You have no tasks today.</h3>
        : <Tasks tasks={tasks.items} />
      }
    </CardText>
  </Card>
);

RecentTasks.propTypes = {
  tasks: React.PropTypes.object.isRequired
};

export default RecentTasks;
