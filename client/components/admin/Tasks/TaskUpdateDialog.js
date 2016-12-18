import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import UpdateTask from '../../Tasks/UpdateTask';
import TasksDialog from './TasksDialog';

const TaskUpdateDialog = ({ onCancel, ...rest }) => (
  <TasksDialog onCancel={onCancel}>
    <UpdateTask detailsBaseUrl='/dashboard/tasks/' {...rest} />
  </TasksDialog>
);

TaskUpdateDialog.propTypes = {
  onCancel: React.PropTypes.func.isRequired
};

export default connect(
  null,
  (_, ownProps) => ({
    ...ownProps,
    onCancel: () => {
      const { onDismiss = f => f } = ownProps;
      onDismiss();
      browserHistory.push('/dashboard');
    }
  })
)(TaskUpdateDialog);
