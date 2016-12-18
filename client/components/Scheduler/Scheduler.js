import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import R from 'ramda';

import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';

import RecentTasks from '../Tasks/RecentTasks';

import styles from './styles.css';

const isAtHome = R.compose(R.not, R.isEmpty, R.match(/\/tasks\/?$/));

const Scheduler = ({ children, location: { pathname } }) => (
  <div className='row'>
    <div className='col-xs-12 col-lg-10 col-lg-offset-1'>
      <div className={`${styles['hide-xs']}`}>
        <h1 className={`text-center ${styles.heading}`}>
          Provisioning Scheduler
        </h1>
        <Divider />
      </div>
      <div className={`row ${styles.content}`}>
        <div
          className={`col-xs-12 col-sm-6 col-md-4 ${isAtHome(pathname) && styles['hide-xs']}`}
        >
          <RecentTasks />
          <div className={styles.createFabButton}>
            <FloatingActionButton
              mini
              onTouchTap={() => browserHistory.push('/tasks/create')}
            >
              <Add />
            </FloatingActionButton>
          </div>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-8'>
          {children}
        </div>
      </div>
    </div>
  </div>
);

Scheduler.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

export default Scheduler;
