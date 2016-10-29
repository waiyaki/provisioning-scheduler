import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import CircularProgress from 'material-ui/CircularProgress';

import { TasksTable } from '../../../components/admin';
import { getComponent } from '../../../utils';
import { selectors as taskSelectors } from '../../../redux/modules/tasks';
import {
  toLocaleTimeString, toLocaleDateString, replaceUserWithNames
} from './utils';

const { getItems, getTasks } = taskSelectors;

class TasksContainer extends Component {
  render() {
    const { tasks, items } = this.props;
    const fieldsToDisplay = [
      'partner', 'engineer', 'contactPerson', 'town', 'siteName',
      'activity', 'medium', 'time', 'createdAt', 'user', 'status'
    ];

    return getComponent(
      <div className='text-center'>
        <CircularProgress />
      </div>,
      <TasksTable {...{ fields: fieldsToDisplay, items }} />,
      [tasks.isFetching]
    );
  }
}

TasksContainer.propTypes = {
  tasks: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default connect(
  state => ({
    tasks: getTasks(state),
    items: R.map(R.compose(
        toLocaleTimeString('time'),
        toLocaleDateString('createdAt'),
        replaceUserWithNames
      ),
      getItems(state)
    )
  })
)(TasksContainer);
