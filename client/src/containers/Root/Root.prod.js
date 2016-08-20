import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Routes from '../../routes';

function Root({ store }) {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
