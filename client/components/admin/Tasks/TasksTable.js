import React, { PropTypes } from 'react';

import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { decamelizeAndTitleCase } from '../../../utils';
import styles from './styles.css';

const inlineStyles = {
  tdNoTasks: {
    fontSize: '1em',
    textAlign: 'center'
  }
};

const TasksTable = ({ fields, items, onRowSelection, selectedRows }) => (
  <Paper>
    <Table onRowSelection={onRowSelection}>
      <TableHeader>
        <TableRow>
          {fields.map(field => (
            <TableHeaderColumn className={styles.tableHeaderColumn} key={field}>
              {decamelizeAndTitleCase(field)}
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody showRowHover deselectOnClickaway={false}>
        {items.length && items.map((task, index) => (
          <TableRow key={task.id} selected={selectedRows.includes(index)}>
            {fields.map(field => (
              <TableRowColumn key={field}>{task[field]}</TableRowColumn>
            ))}
          </TableRow>
        )) || (
          <TableRow>
            <TableRowColumn colSpan={fields.length} style={inlineStyles.tdNoTasks}>
              There are no tasks for selected time range.
            </TableRowColumn>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Paper>
);

TasksTable.propTypes = {
  fields: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onRowSelection: PropTypes.func.isRequired,
  selectedRows: PropTypes.array.isRequired
};

export default TasksTable;
