import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import HelloWorld from '../HelloWorld';

function Root({ store }) {
  return (
    <Provider store={store}>
      <HelloWorld />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
