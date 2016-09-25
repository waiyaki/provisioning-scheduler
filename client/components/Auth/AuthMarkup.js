import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default function AuthMarkup({ name, children }) {
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4'>
        <Card>
          <CardTitle
            className='text-xs-center'
            title={name}
          />
          <Divider />
          <CardText>
            {children}
          </CardText>
        </Card>
      </div>
    </div>
  );
}

AuthMarkup.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
