import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';

import TaskDetails from '../../Tasks/TaskDetails';
import TasksDialog from './TasksDialog';

import { selectors } from '../../../redux/modules/tasks';

const { getItemById } = selectors;

const TaskDetailsDialog = ({ task }) => {
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
    <TasksDialog onCancel={() => browserHistory.push('/dashboard')}>
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
  task: PropTypes.object.isRequired
};

export default connect(
  (state, ownProps) => {
    console.log('ownProps: ', ownProps);
    const { params: { id } } = ownProps;
    return {
      task: getItemById(id, state)
    };
  }
)(TaskDetailsDialog);
