import React, { PropTypes } from 'react';

import Divider from 'material-ui/Divider';

import RecentTasks from './RecentTasks';

import styles from './styles.css';

const Scheduler = (props) => (
  <div className='row'>
    <div className='col-xs-12 col-lg-10 col-lg-offset-1'>
      <h1 className={`text-center ${styles.heading}`}>
        Provisioning Scheduler
      </h1>
      <Divider />
      <div className={`row ${styles.content}`}>
        <div className='col-xs-12 col-md-4'>
          <RecentTasks tasks={props.tasks} items={props.items} />
        </div>
        <div className='col-xs-12 col-md-8'>
          {React.cloneElement(props.children, { ...props })}
        </div>
      </div>
    </div>
  </div>
);

Scheduler.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired
};

export default Scheduler;
