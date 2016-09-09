import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import VerifyAccount from './VerifyAccount';
import VerifyingAccount from './VerifyingAccount';

const titleStyles = {
  fontSize: '2em'
};

const cardTextStyles = {
  fontSize: '1.2em'
};

export const UnverifiedAccount = ({ user, isFetching, params }) => (
  <div className='row'>
    <div className='col-xs col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4'>
      <div className='box'>
        <Card className='text-center'>
          <CardTitle
            title='Provisioning Scheduler'
            titleStyle={titleStyles}
          />
          <Divider />
          <CardText style={cardTextStyles}>
            {params && params.token && isFetching
              ? <VerifyingAccount />
              : <VerifyAccount user={user} />
            }
          </CardText>
        </Card>
      </div>
    </div>
  </div>
);

UnverifiedAccount.propTypes = {
  user: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.object
};

export default UnverifiedAccount;
