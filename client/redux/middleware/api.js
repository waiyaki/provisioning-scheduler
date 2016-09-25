import curry from 'lodash/fp/curry';
import Axios from 'axios';

export default function callApiMiddleware({ dispatch, getState }) {
  return next => action => {
    const is = curry((type, value) => typeof value === type);
    const isStr = is('string');
    const isFn = is('function');

    const {
      types,
      callApi,
      shouldCallApi = () => true,
      payload = {}
    } = action;

    if (!types) {
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(isStr)) {
      throw new Error('Expected an array of three string types.');
    }

    if (!isFn(callApi)) {
      throw new Error('Expected callApi to be a function.');
    }

    if (!shouldCallApi(getState())) {
      return; // eslint-disable-line consistent-return
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    dispatch({
      ...payload,
      type: REQUEST
    });

    return callApi(Axios)
      .then(
        response => dispatch({
          payload: { ...payload, ...response.data },
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
