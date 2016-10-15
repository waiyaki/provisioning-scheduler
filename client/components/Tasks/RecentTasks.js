import React from 'react';
import classNames from 'classnames';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Tasks from './Tasks';
import { getComponent } from '../../utils';
import styles from './styles.css';

const RecentTasks = ({ tasks, items }) => (
  <Card zDepth={0} className={classNames({ 'full-height': !!items.length })}>
    <CardTitle
      className='text-center'
      title="Today's Tasks"
    />
    <Divider />
    <CardText className={styles.tasks}>
      {getComponent(
        <Tasks tasks={tasks.items} />,
        getComponent(
          <div className='text-center'>
            <CircularProgress />
          </div>,
          <h3 className='text-center'>You have no tasks today.</h3>,
          [tasks.isFetching]
        ),
        [items.length]
      )}
    </CardText>
  </Card>
);

RecentTasks.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  items: React.PropTypes.array.isRequired
};

export default RecentTasks;
