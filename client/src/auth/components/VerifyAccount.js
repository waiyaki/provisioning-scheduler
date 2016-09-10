import React from 'react';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

export default function VerifyAccount({ user }) {
  return (
    <div>
      <p>Hey {user.username}!</p>
      <p>
        Thank you for registering, we've sent you a confirmation email.
        Kindly click on the link provided in the email to confirm your account, thanks.
      </p><br />
      {!user && (
        <div>
          <p style={{ fontSize: '0.8em', marginBottom: '0.6em' }}>
            Already Confirmed?
          </p>
          <RaisedButton onClick={() => browserHistory.push('/login')}>
            Login
          </RaisedButton>
        </div>
      )}
    </div>
  );
}

VerifyAccount.propTypes = {
  user: React.PropTypes.object
};
