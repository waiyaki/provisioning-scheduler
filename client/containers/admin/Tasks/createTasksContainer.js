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

export default function createTasksContainer(Dialog = null) {
  class TasksContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedRows: []
      };

      this.onRowSelection = this.onRowSelection.bind(this);
      this.setSelectedRow = this.setSelectedRow.bind(this);
      this.deselectRows = this.deselectRows.bind(this);
    }

    componentDidMount() {
      this.setSelectedRow();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props) {
        this.setSelectedRow();
      }
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

    setSelectedRow() {
      const { params, items } = this.props;

      if (params.id) {
        const id = Number(params.id);
        const index = items.findIndex(item => item.id === id);
        this.onRowSelection([index]);
      }
    }

    deselectRows() {
      this.setState({
        selectedRows: []
      }, () => {
        browserHistory.push('/dashboard');
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
              onRowSelection: (rows) => this.onRowSelection(rows, true)
            }}
          />
          {Dialog && <Dialog
            {...{
              items,
              selectedRows: this.state.selectedRows,
              deselectRows: this.deselectRows
            }}
          />}
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

  return connect(
    state => ({
      tasks: getTasks(state),
      items: getItems(state)
    })
  )(TasksContainer);
}
