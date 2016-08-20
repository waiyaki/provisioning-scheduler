import React from 'react';

import requireAuthentication from '../AuthContainer/requireAuthentication';
const Homepage = () => (
  <div>
    <h1>Hello there! You're finally home!</h1>
  </div>
);

export default requireAuthentication(Homepage);
