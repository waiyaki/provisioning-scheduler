import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';

import CircularProgress from 'material-ui/CircularProgress';

import { TasksTable } from '../../../components/admin';
import {
  getComponent, toLocaleTimeString, toLocaleDateString, replaceUserWithNames
} from '../../../utils';
import { selectors as taskSelectors } from '../../../redux/modules/tasks';

const { getItems, getTasks } = taskSelectors;

class TasksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: []
    };

    this.onRowSelection = this.onRowSelection.bind(this);
    this.deselectRows = this.deselectRows.bind(this);
  }

  onRowSelection(selectedRows, changeRoute = false) {
    this.setState({
      selectedRows
    }, () => {
      if (!changeRoute) return;
      const { items } = this.props;
      const selectedRow = R.head(this.state.selectedRows);
      const id = R.prop('id', items[selectedRow]);
      browserHistory.push(`/dashboard/tasks/${id}`);
    });
  }

  deselectRows() {
    this.setState({
      selectedRows: []
    }, () => {
      browserHistory.push('/dashboard');
    });
  }

  render() {
    const { tasks, items, children } = this.props;

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
            onRowSelection: (rows) => this.onRowSelection(rows, true)
          }}
        />
        {children && React.cloneElement(children, {
          onDismiss: this.deselectRows
        })}
      </div>,
      [tasks.isFetching]
    );
  }
}

TasksContainer.propTypes = {
  children: PropTypes.element,
  tasks: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  })
};

export default connect(
  state => ({
    tasks: getTasks(state),
    items: getItems(state)
  })
)(TasksContainer);

