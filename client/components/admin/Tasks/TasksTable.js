import React, { PropTypes } from 'react';

import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { decamelizeAndTitleCase } from '../../../utils';
import styles from './styles.css';

const TasksTable = ({ fields, items }) => (
  <Paper>
    <Table selectable={false}>
      <TableHeader>
        <TableRow>
          {fields.map(field => (
            <TableHeaderColumn className={styles.tableHeaderColumn} key={field}>
              {decamelizeAndTitleCase(field)}
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody showRowHover>
        {items.map(task => (
          <TableRow key={task.id}>
            {fields.map(field => (
              <TableRowColumn key={field}>{task[field]}</TableRowColumn>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

TasksTable.propTypes = {
  fields: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired
};

export default TasksTable;
