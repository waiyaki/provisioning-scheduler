import { prop, compose } from 'ramda';
import { combineReducers } from 'redux';

import tasks from './tasks';

const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export function scheduler(state = {
  isFetching: false,
  error: null
}, action) {
  switch (action) {
    case FETCH_TASKS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_TASKS_SUCCESS:
      return { ...state, isFetching: false, error: null };
    case FETCH_TASKS_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
}

// Actions
export function fetchTasks() {
  return (dispatch, getState) => {
    const { scheduler: { tasks: tasksInState } } = getState();
    return !tasksInState.length && dispatch({
      types: [FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE],
      callApi: client => client.get('/api/scheduled-tasks'),
      meta: { authenticate: true }
    });
  };
}

// Selectors
const getScheduler = compose(prop('scheduler'), prop('scheduler'));

export const selectors = {
  getScheduler
};

export default combineReducers({ scheduler, tasks });
