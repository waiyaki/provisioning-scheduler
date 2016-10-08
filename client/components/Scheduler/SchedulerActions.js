import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styles from './styles.css';

const SchedulerActions = ({ items }) => (
  <div className={`row middle-xs text-center ${styles.schedulerActions}`}>
    <div className={`col-xs-12 ${styles.content}`}>
      {items && items.length
        ?
        <p>Click on an task from the list to edit it.</p>
        :
        <p>You have no tasks yet.</p>
      }
      <RaisedButton
        onTouchTap={() => browserHistory.push('/tasks/create')}
        label='New Task'
        primary
      />
    </div>
    <div className={styles.createTask}>
      <FloatingActionButton
        onTouchTap={() => browserHistory.push('/tasks/create')}
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
);

SchedulerActions.propTypes = {
  items: PropTypes.array
};

export default SchedulerActions;
