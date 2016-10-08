import React from 'react';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default function Task({ task: { activity, town, siteName, time } }) {
  return (
    <span>
      <ListItem
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
