import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';

// Action types.
const LOGIN_REQUEST = 'scheduler/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'scheduler/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'scheduler/auth/LOGIN_FAILURE';

// Reducer
const initialState = {
  isAuthenticated: false,
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        user: action.payload
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
}

// Actions
export function login(data) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    callApi: (client) => client.post('/api/users/login', data)
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
