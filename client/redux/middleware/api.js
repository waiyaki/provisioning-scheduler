import curry from 'lodash/fp/curry';
import Axios from 'axios';

import { getAuthToken } from '../../utils';

// Performance hit? 😕
const getAxiosInstance = auth => (auth
  ? Axios.create({
    headers: { 'X-Access-Token': getAuthToken() }
  })
  : Axios
);

export default function callApiMiddleware({ dispatch, getState }) {
  return next => action => {
    const is = curry((type, value) => typeof value === type);
    const isStr = is('string');
    const isFn = is('function');

    const {
      types,
      callApi,
      shouldCallApi = () => true,
      payload = {},
      meta: { authenticate = false } = {}
    } = action;

    if (!types) {
      return next(action);
    }

    let err = null;
    if (!Array.isArray(types) || types.length !== 3 || !types.every(isStr)) {
      err = new Error('Expected an array of three string types.');
    } else if (!isFn(callApi)) {
      err = new Error('Expected callApi to be a function.');
    }
    if (err) {
      // sometimes the thrown error is being swallowed by a try/catch we don't control
      console.error(err); // eslint-disable-line no-console
      throw err;
    }

    if (!shouldCallApi(getState())) {
      return; // eslint-disable-line consistent-return
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    dispatch({
      ...payload,
      type: REQUEST
    });

    return callApi(getAxiosInstance(authenticate))
      .then(
        response => dispatch({
          payload: response.data,
          type: SUCCESS
        }),
        error => dispatch({
          ...payload,
          error: error.response.data || error.message || 'Something bad happened.',
          type: FAILURE
        })
      )
      .catch(error => dispatch({
        ...payload,
        error,
        type: FAILURE
      }));
  };
}
