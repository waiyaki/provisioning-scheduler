/*  eslint-disable max-len */

import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import VerifyAccount from './VerifyAccount';
import VerifyingAccount from './VerifyingAccount';
import ResendVerificationEmail from './ResendVerificationEmail';

import { getComponent } from '../../utils';

const titleStyles = {
  fontSize: '2em'
};

const cardTextStyles = {
  fontSize: '1.2em'
};

export const UnverifiedAccount = ({
  user, isFetching, params, error, resendEmail, verificationMessage
}) => (
  <div className='row'>
    <div className='col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
      <Card className='text-center'>
        <CardTitle
          title='Provisioning Scheduler'
          titleStyle={titleStyles}
        />
        <Divider />
        <CardText style={cardTextStyles}>
          {getComponent(
            <ResendVerificationEmail
              resendEmail={resendEmail}
              sendError={error}
              user={user}
              verificationMessage={verificationMessage}
            />,
            getComponent(
              <VerifyingAccount />,
              <VerifyAccount user={user} error={error} />,
              [params, params.token, isFetching]
            ),
            [params, params.token, params.token === 'resend']
          )}
        </CardText>
      </Card>
    </div>
  </div>
);

UnverifiedAccount.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.object,
  resendEmail: PropTypes.func.isRequired,
  verificationMessage: PropTypes.object
};

export default UnverifiedAccount;
