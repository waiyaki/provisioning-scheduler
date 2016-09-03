import Axios from 'axios';

import * as actionTypes from '../constants/authActionTypes';
import { setAuthToken, removeAuthToken } from '../utils';

export const register = data => dispatch => {
  dispatch({
    type: actionTypes.REGISTER_USER_REQUEST
  });

  return Axios.post('/api/users', data)
    .then(
      response => {
        const user = response.data;
        dispatch({
          type: actionTypes.REGISTER_USER_SUCCESS,
          user
        });
        setAuthToken(user.token);
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: actionTypes.REGISTER_USER_FAILURE,
          error: error.response.data || error.message
        });
        return Promise.reject(error);
      }
    );
};

export function clearAuthErrors() {
  return {
    type: actionTypes.CLEAR_AUTH_ERRORS
  };
}

export const verifyToken = token => dispatch => {
  dispatch({
    type: actionTypes.VERIFY_ACCOUNT_REQUEST
  });

  return Axios.get(`/api/users/verify-email/${token}/verify`)
    .then(
      response => {
        const user = response.data;
        dispatch({
          type: actionTypes.VERIFY_ACCOUNT_SUCCESS,
          user
        });
        setAuthToken(user.token);
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: actionTypes.VERIFY_ACCOUNT_FAILURE,
          error: {
            verificationError: error.response.data || error.message
          }
        });
        return Promise.reject(error);
      }
    );
};

export const login = data => dispatch => {
  dispatch({
    type: actionTypes.LOGIN_USER_REQUEST
  });

  return Axios.post('/api/users/login', data)
    .then(
      response => {
        const user = response.data;
        dispatch({
          type: actionTypes.LOGIN_USER_SUCCESS,
          user
        });
        setAuthToken(user.token);
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: actionTypes.LOGIN_USER_FAILURE,
          error: error.response.data || error.message
        });
        return Promise.reject(error);
      }
    );
};

export const logout = () => dispatch => {
  removeAuthToken();
  dispatch({
    type: actionTypes.LOGOUT
  });
};
