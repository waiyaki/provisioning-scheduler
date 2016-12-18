import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';

import TaskDetails from '../../Tasks/TaskDetails';
import TasksDialog from './TasksDialog';

import { selectors } from '../../../redux/modules/tasks';

const { getItemById } = selectors;

const TaskDetailsDialog = ({ task, onCancel }) => {
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
    <TasksDialog onCancel={onCancel}>
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
  task: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDismiss: PropTypes.func
};

export default connect(
  (state, ownProps) => {
    const { params: { id } } = ownProps;
    return {
      task: getItemById(id, state)
    };
  },
  (_, { onDismiss = f => f }) => ({
    onCancel: () => {
      onDismiss();
      browserHistory.push('/dashboard');
    }
  })
)(TaskDetailsDialog);
