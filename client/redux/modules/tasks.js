import { prop, compose } from 'ramda';

const INITIAL_STATE = {
  isFetching: false,
  items: [],
  error: null
};

const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { ...state, isFetching: true, error: null };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: [action.payload, ...state.items]
      };
    case CREATE_TASK_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_TASKS_SUCCESS:
      return { ...state, isFetching: false, items: action.payload };

    default:
      return state;
  }
}

// Actions
export function createTask(data) {
  return {
    types: [CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE],
    callApi: client => client.post('/api/scheduled-tasks', data),
    meta: { authenticate: true }
  };
}

// Selectors
const getTasks = compose(prop('tasks'), prop('scheduler'));
export const selectors = {
  getTasks
};
