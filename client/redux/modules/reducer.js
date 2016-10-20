import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import tasks from './tasks';
import { removeAuthToken } from '../../utils';

const INITIAL_STATE = {
  tasks: tasks(undefined, {}),
  auth: auth(undefined, {})
};

// Action types that cause an effect in more than a single piece of state.
const LOGOUT = 'scheduler/LOGOUT';

// Reducer that handles combined state.
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return {
        tasks: tasks(state.tasks, action),
        auth: auth(state.auth, action)
      };
  }
}

// Actions that describe an effect to more than one state piece.
export function logout() {
  removeAuthToken();
  return {
    type: LOGOUT
  };
}

export default combineReducers({
  form,
  scheduler: reducer
});
