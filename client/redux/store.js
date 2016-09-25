import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import callApiMiddleware from './middleware/api';

import reducer from './modules/reducer';

let middleware = [thunkMiddleware, callApiMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({
    predicate: (_, action) => !action.type.startsWith('redux-form')
  });
  middleware = [...middleware, loggerMiddleware];
}

const enhancer = applyMiddleware(...middleware);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      /* eslint-disable global-require */
      const nextReducer = require('./modules/reducer').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
