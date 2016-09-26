import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';

import { setAuthToken, removeAuthToken } from '../../utils';

// Action types.
const LOGIN_REQUEST = 'scheduler/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'scheduler/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'scheduler/auth/LOGIN_FAILURE';
const REGISTER_REQUEST = 'scheduler/auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'scheduler/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'scheduler/auth/REGISTER_FAILURE';
const LOGOUT = 'scheduler/auth/LOGOUT';

// Reducer
const initialState = {
  isAuthenticated: false,
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        user: action.payload
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

// Actions
const interceptAndSaveAuthToken = apiCall => client => (
  apiCall(client)
    .then(response => {
      const { token } = response.data;
      setAuthToken(token);
      return response;
    })
);

export function login(data) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    callApi: interceptAndSaveAuthToken(
      client => client.post('/api/users/login', data)
    )
  };
}

export function register(data) {
  return {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
    callApi: client => client.post('/api/users', data)
  };
}

export function logout() {
  removeAuthToken();
  return {
    type: LOGOUT
  };
}

// Selectors.
const getProp = curry((prop, object) => object[prop]);
const getAuth = getProp('auth');
const getUser = compose(getProp('user'), getAuth);

export const selectors = {
  getUser,
  getAuth
};
