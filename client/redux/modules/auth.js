import R from 'ramda';

import { setAuthToken } from '../../utils';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  user: null
};


// /////////////////////////////////////////////////////////////// //
//                            Actions Types                        //
// /////////////////////////////////////////////////////////////// //
const LOGIN_REQUEST = 'scheduler/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'scheduler/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'scheduler/auth/LOGIN_FAILURE';
const REGISTER_REQUEST = 'scheduler/auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'scheduler/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'scheduler/auth/REGISTER_FAILURE';
const VERIFY_ACCOUNT_REQUEST = 'scheduler/auth/VERIFY_ACCOUNT_REQUEST';
const VERIFY_ACCOUNT_SUCCESS = 'scheduler/auth/VERIFY_ACCOUNT_SUCCESS';
const VERIFY_ACCOUNT_FAILURE = 'scheduler/auth/VERIFY_ACCOUNT_FAILURE';
const RESEND_EMAIL_REQUEST = 'scheduler/auth/RESEND_EMAIL_REQUEST';
const RESEND_EMAIL_SUCCESS = 'scheduler/auth/RESEND_EMAIL_SUCCESS';
const RESEND_EMAIL_FAILURE = 'scheduler/auth/RESEND_EMAIL_FAILURE';
const CLEAR_AUTH_ERRORS = 'scheduler/auth/CLEAR_AUTH_ERRORS';


// /////////////////////////////////////////////////////////////// //
//                           Reducer                               //
// /////////////////////////////////////////////////////////////// //
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESEND_EMAIL_REQUEST:
    case VERIFY_ACCOUNT_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case VERIFY_ACCOUNT_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        user: action.payload
      };

    case RESEND_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        verificationMessage: action.payload,
        error: null
      };

    case RESEND_EMAIL_FAILURE:
    case VERIFY_ACCOUNT_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
        verificationMessage: null
      };

    default:
      return state;
  }
}


// /////////////////////////////////////////////////////////////// //
//                              Actions                            //
// /////////////////////////////////////////////////////////////// //
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

export function verifyToken(token) {
  return {
    types: [
      VERIFY_ACCOUNT_REQUEST, VERIFY_ACCOUNT_SUCCESS, VERIFY_ACCOUNT_FAILURE
    ],
    callApi: interceptAndSaveAuthToken(
      client => client.get(`/api/users/verify-email/${token}/verify`)
    )
  };
}

export function resendVerificationEmail({ email }) {
  return {
    types: [
      RESEND_EMAIL_REQUEST, RESEND_EMAIL_SUCCESS, RESEND_EMAIL_FAILURE
    ],
    callApi: client => client.put('/api/users/verify-email/resend', { email })
  };
}

export function clearAuthErrors() {
  return {
    type: CLEAR_AUTH_ERRORS
  };
}


// /////////////////////////////////////////////////////////////// //
//                              Selectors                          //
// /////////////////////////////////////////////////////////////// //
const getAuth = R.compose(R.prop('auth'), R.prop('scheduler'));
const getUser = R.compose(R.prop('user'), getAuth);

export const selectors = {
  getUser,
  getAuth
};
