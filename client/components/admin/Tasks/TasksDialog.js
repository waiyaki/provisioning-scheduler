import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const TasksDialog = ({ children, onCancel }) => {
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
      open
    >
      {children}
    </Dialog>
  );
};

TasksDialog.propTypes = {
  children: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default TasksDialog;
