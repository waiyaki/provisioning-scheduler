import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';

import RecentTasks from '../Tasks/RecentTasks';

import styles from './styles.css';

const Scheduler = (props) => (
  <div className='row'>
    <div className='col-xs-12 col-lg-10 col-lg-offset-1'>
      <h1 className={`text-center ${styles.heading}`}>
        Provisioning Scheduler
      </h1>
      <Divider />
      <div className={`row ${styles.content}`}>
        <div className='col-xs-12 col-sm-6 col-md-4'>
          <RecentTasks items={props.items} tasks={props.tasks} />
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
