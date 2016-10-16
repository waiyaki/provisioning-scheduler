import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { compose, pickBy, omit, is, keys as toKeys } from 'ramda';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import { decamelizeAndTitleCase } from '../../utils';
import styles from './styles.css';

const intoHalves = xs => ({
  firstHalf: xs.slice(0, xs.length / 2 + 1),
  secondHalf: xs.slice(xs.length / 2 + 1)
});

const halves = compose(
  intoHalves,
  toKeys,
  pickBy(is(String)),
  omit(['createdAt', 'time', 'updatedAt'])
);

const renderHalf = (task, half) => half.map(key => (
  <ListItem
    disabled
    primaryText={decamelizeAndTitleCase(key)}
    secondaryText={task[key]}
    key={key}
  />
));

const renderTime = time => (
  <ListItem
    disabled
    primaryText='Time'
    secondaryText={new Date(time).toLocaleTimeString()}
  />
);

const TaskDetails = ({ task = {} }) => {
  const keys = halves(task);
  return (
    <Card zDepth={0}>
      <CardTitle
        className='text-center'
        title={task.activity}
      />
      <Divider />
      <CardText>
        <List>
          <div className='row'>
            <div className='col-xs-12 col-md-6'>
              {renderHalf(task, keys.firstHalf)}
            </div>
            <div className='col-xs-12 col-md-6'>
              {renderHalf(task, keys.secondHalf)}
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
  task: PropTypes.object
};

export default TaskDetails;
