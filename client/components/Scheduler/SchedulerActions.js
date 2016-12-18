import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './styles.css';
import { selectors } from '../../redux/modules/tasks';

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
  </div>
);

SchedulerActions.propTypes = {
  items: PropTypes.array
};

export default connect(
  state => ({
    items: selectors.getItems(state)
  })
)(SchedulerActions);
