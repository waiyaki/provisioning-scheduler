import React from 'react';

import auth from '../../auth';

const Homepage = () => (
  <div>
    <h1>Hello there! You're finally home!</h1>
  </div>
);

export default auth.containers.requireAuthentication(Homepage);
