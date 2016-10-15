import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { flip } from 'ramda';

import { selectors } from '../../redux/modules/tasks';
import { UpdateTask } from '../../components';

const { getItemById } = selectors;

const EditTask = ({ getTask, params: { taskId }, ...rest }) => {
  const task = getTask(taskId);
  return (
    <UpdateTask {...{ task, ...rest }} />
  );
};

EditTask.propTypes = {
  getTask: PropTypes.func.isRequired,
  params: PropTypes.shape({
    taskId: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired
  }).isRequired
};

export default connect(
  state => ({ getTask: flip(getItemById)(state) })
)(EditTask);
