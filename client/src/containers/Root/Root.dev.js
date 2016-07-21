import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import DevTools from '../DevTools';
import HelloWorld from '../HelloWorld';

function Root(props) {
  return (
    <Provider store={props.store}>
      <div>
        <HelloWorld />
        <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
