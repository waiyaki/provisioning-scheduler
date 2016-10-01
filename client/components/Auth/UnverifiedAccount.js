import React, { PropTypes } from 'react';
import curry from 'lodash/fp/curry';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import VerifyAccount from './VerifyAccount';
import VerifyingAccount from './VerifyingAccount';
import ResendVerificationEmail from './ResendVerificationEmail';

const titleStyles = {
  fontSize: '2em'
};

const cardTextStyles = {
  fontSize: '1.2em'
};

export const UnverifiedAccount = ({
  user, isFetching, params, error, resendEmail, verificationMessage
}) => {
  const getComponent = curry(
    (first, other, args) => (args.every(Boolean) ? first : other));

  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4'>
        <Card className='text-xs-center'>
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
};

UnverifiedAccount.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.object,
  resendEmail: PropTypes.func.isRequired,
  verificationMessage: PropTypes.object
};

export default UnverifiedAccount;
