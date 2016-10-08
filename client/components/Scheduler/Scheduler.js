import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';

import RecentTasks from './RecentTasks';
import ScheduleTask from './ScheduleTask';
import styles from './styles.css';

const Scheduler = ({ onSubmit, tasks }) => (
  <div className='row'>
    <div className='col-xs-12 col-lg-10 col-lg-offset-1'>
      <h1 className={`text-center ${styles.heading}`}>
        Provisioning Scheduler
      </h1>
      <Divider />
      <div className={`row ${styles.content}`}>
        <div className='col-xs-12 col-md-4'>
          <RecentTasks tasks={tasks} />
        </div>
        <div className='col-xs-12 col-md-8'>
          <ScheduleTask {...{ onSubmit, tasks }} />
        </div>
      </div>
    </div>
  </div>
);

Scheduler.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired
};

export default Scheduler;
