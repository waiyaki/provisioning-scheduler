import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Routes from '../../routes';
import DevTools from '../../containers/DevTools';

function Root(props) {
  return (
    <Provider store={props.store}>
      <div>
        <Routes />
        <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
