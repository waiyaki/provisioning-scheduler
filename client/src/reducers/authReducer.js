import * as authActionTypes from '../constants/authActionTypes';
import { getAuthToken } from '../utils';

const INITIAL_AUTH_STATE = {
  isAuthenticated: !!getAuthToken(),
  isFetching: false,
  user: {},
  errors: {}
};

export default function authReducer(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {
    case authActionTypes.REGISTER_USER_REQUEST:
    case authActionTypes.VERIFY_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case authActionTypes.REGISTER_USER_SUCCESS:
    case authActionTypes.VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      };

    case authActionTypes.REGISTER_USER_FAILURE:
    case authActionTypes.VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: {
          ...action.error
        }
      };

    case authActionTypes.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: {}
      };

    default:
      return state;
  }
}
