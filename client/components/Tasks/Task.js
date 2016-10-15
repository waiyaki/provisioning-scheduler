import React from 'react';
import { browserHistory } from 'react-router';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default function Task({ task: { activity, town, siteName, time, id } }) {
  return (
    <span>
      <ListItem
        onTouchTap={() => browserHistory.push(`/tasks/${id}`)}
        primaryText={activity}
        secondaryText={
          `In ${siteName}, ${town} at ${new Date(time).toLocaleTimeString()}`}
      />
      <Divider />
    </span>
  );
}

Task.propTypes = {
  task: React.PropTypes.object.isRequired
};
