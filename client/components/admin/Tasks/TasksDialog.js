import React, { PropTypes } from 'react';
import R from 'ramda';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { TaskDetails } from '../../../components';

const TasksDialog = ({ items, selectedRows, deselectRows }) => {
  const actions = [
    <FlatButton
      label='Cancel'
      onTouchTap={deselectRows}
      primary
    />,
    <FlatButton
      disabled
      label='Submit'
      onTouchTap={f => f}
      primary
    />
  ];

  const contentStyle = {
    width: '60%',
    maxWidth: 'none'
  };

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

  return (
    <Dialog
      actions={actions}
      autoScrollBodyContent
      contentStyle={contentStyle}
      modal
      open={!!selectedRows.length}
    >
      <TaskDetails
        task={items[R.head(selectedRows)]}
        transforms={transforms}
      />
    </Dialog>
  );
};

TasksDialog.propTypes = {
  items: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired,
  deselectRows: PropTypes.func.isRequired
};

export default TasksDialog;
