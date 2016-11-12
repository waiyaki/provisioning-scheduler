import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { omit } from 'ramda';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import styles from './styles.css';
import { halves, transformTask } from './task-details-helpers';
import { decamelizeAndTitleCase } from '../../utils';

export const renderHalf = (task, half) => half.map(key => (
  <ListItem
    disabled
    primaryText={decamelizeAndTitleCase(key)}
    secondaryText={task[key]}
    key={key}
  />
));

export const renderTime = time => (
  <ListItem
    disabled
    primaryText='Time'
    secondaryText={new Date(time).toLocaleTimeString()}
  />
);

const TaskDetails = ({ task = {}, exclude = [], transforms = [] }) => {
  let taskToRender = omit(['time', ...exclude], task);
  if (!isEmpty(taskToRender)) {
    taskToRender = transformTask(transforms, taskToRender);
  }
  const keys = halves(taskToRender);
  return (
    <Card>
      <CardTitle
        className='text-center'
        title={taskToRender.activity}
      />
      <Divider />
      <CardText>
        <List>
          <div className='row'>
            <div className='col-xs-12 col-md-6'>
              {renderHalf(taskToRender, keys.firstHalf)}
            </div>
            <div className='col-xs-12 col-md-6'>
              {renderHalf(taskToRender, keys.secondHalf)}
              {renderTime(task.time)}
            </div>
          </div>
        </List>
        <div className={styles.editButton}>
          <FloatingActionButton
            onTouchTap={() => browserHistory.push(`/tasks/${task.id}/edit`)}
          >
            <ModeEdit />
          </FloatingActionButton>
        </div>
      </CardText>
    </Card>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.object,
  exclude: PropTypes.array,
  transforms: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.array.isRequired,
    renderAs: PropTypes.func.isRequired
  }))
};

export default TaskDetails;
