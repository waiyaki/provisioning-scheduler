import React from 'react';
import { Link } from 'react-router';

import styles from './authStyles.css';

export default function VerifyAccount({ user, error }) {
  return (
    <div className='text-xs-center'>
      {error && error.message
        ? <div>
          <p className={styles.error}>{error.message}</p>
          <p><Link to='/verify/resend'>Click here to resend the email.</Link></p>
        </div>
        : <div>
          <p>Hey {user && user.username || 'there'}!</p>
          <p>
            Thank you for registering, we've sent you a confirmation email.
            Kindly click on the link provided in the email to confirm your account, thanks.
          </p>
          <p>
            <small>
              Didn't receive the email? <Link to='/verify/resend'>Click here.</Link>
            </small>
          </p>
        </div>
      }
      {!user && (
        <p className={styles.alreadyConfirmed}>
          You can also <Link to='/login'>login</Link> or <Link to='/register'>register</Link>
        </p>
      )}
    </div>
  );
}

VerifyAccount.propTypes = {
  user: React.PropTypes.object,
  error: React.PropTypes.object
};
