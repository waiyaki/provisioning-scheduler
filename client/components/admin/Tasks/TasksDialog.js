import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const TasksDialog = ({ children, onCancel, ...rest }) => {
  const { selectedRows } = rest;
  const actions = [
    <FlatButton
      label='Dismiss'
      onTouchTap={onCancel}
      primary
    />
  ];

  const contentStyle = {
    width: '60%',
    maxWidth: 'none'
  };

  return (
    <Dialog
      actions={actions}
      autoScrollBodyContent
      contentStyle={contentStyle}
      onRequestClose={onCancel}
      open={!!selectedRows.length}
    >
      {React.cloneElement(children, ...rest)}
    </Dialog>
  );
};

TasksDialog.propTypes = {
  children: PropTypes.element.isRequired,
  selectedRows: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default TasksDialog;
