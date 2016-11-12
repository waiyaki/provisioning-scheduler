import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import CircularProgress from 'material-ui/CircularProgress';

import { TasksTable, TasksDialog } from '../../../components/admin';
import { getComponent } from '../../../utils';
import { selectors as taskSelectors } from '../../../redux/modules/tasks';
import {
  toLocaleTimeString, toLocaleDateString, replaceUserWithNames
} from './utils';

const { getItems, getTasks } = taskSelectors;

class TasksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: []
    };

    this.onRowSelection = this.onRowSelection.bind(this);
    this.deselectRows = this.deselectRows.bind(this);
  }

  onRowSelection(selectedRows) {
    this.setState({
      selectedRows
    });
  }

  deselectRows() {
    this.setState({
      selectedRows: []
    });
  }

  render() {
    const { tasks, items } = this.props;
    const fieldsToDisplay = [
      'partner', 'engineer', 'contactPerson', 'town', 'siteName',
      'activity', 'medium', 'time', 'createdAt', 'user', 'status'
    ];

    const replaceUserAndConvertTimes = R.compose(
      toLocaleTimeString('time'),
      toLocaleDateString('createdAt'),
      replaceUserWithNames
    );
    const itemsToTabulate = R.map(replaceUserAndConvertTimes, items);

    return getComponent(
      <div className='text-center'>
        <CircularProgress />
      </div>,
      <div>
        <TasksTable
          {...{
            fields: fieldsToDisplay,
            items: itemsToTabulate,
            selectedRows: this.state.selectedRows,
            onRowSelection: this.onRowSelection
          }}
        />
        <TasksDialog
          {...{
            items,
            selectedRows: this.state.selectedRows,
            deselectRows: this.deselectRows
          }}
        />
      </div>,
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
    items: getItems(state)
  })
)(TasksContainer);
