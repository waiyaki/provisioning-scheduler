import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

export default function VerifyingAccount() {
  return (
    <div>
      <CircularProgress />
      <br />
      <small>Verifying your account...</small>
    </div>
  );
}
