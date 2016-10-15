import React, { PropTypes } from 'react';

import List from 'material-ui/List/List';
import Task from './Task';

const Tasks = ({ tasks }) => (
  <List>
    {tasks.map((task, i) => <Task key={i} task={task} />)}
  </List>
);

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default Tasks;
