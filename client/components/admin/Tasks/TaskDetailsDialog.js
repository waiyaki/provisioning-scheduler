import React, { PropTypes } from 'react';
import R from 'ramda';

import TaskDetails from '../../Tasks/TaskDetails';
import TasksDialog from './TasksDialog';

const TaskDetailsDialog = ({ deselectRows, items, selectedRows }) => {
  const transforms = [{
    fields: ['createdAt', 'updatedAt'],
    renderAs: dateString => {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
    }
  }, {
    fields: ['user'],
    renderAs: R.compose(R.join(' '), R.props(['firstName', 'lastName']))
  }];

  const task = items[R.head(selectedRows)];

  return (
    <TasksDialog onCancel={deselectRows} selectedRows={selectedRows}>
      <TaskDetails
        {...{
          task,
          transforms
        }}
      />
    </TasksDialog>
  );
};

TaskDetailsDialog.propTypes = {
  deselectRows: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired
};

export default TaskDetailsDialog;
