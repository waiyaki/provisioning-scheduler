import { prop } from 'ramda';

const INITIAL_STATE = {
  isFetching: false,
  items: [],
  error: null
};

const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

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
    case FETCH_TASKS_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_TASKS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state, isFetching: false, items: action.payload, error: null
      };

    default:
      return state;
  }
}

// Actions
export function fetchTasks() {
  return (dispatch, getState) => {
    const { tasks: { items } } = getState();
    return !items.length && dispatch({
      types: [FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE],
      callApi: client => client.get('/api/scheduled-tasks'),
      meta: { authenticate: true }
    });
  };
}

export function createTask(data) {
  return {
    types: [CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE],
    callApi: client => client.post('/api/scheduled-tasks', data),
    meta: { authenticate: true }
  };
}

// Selectors
const getTasks = prop('tasks');
export const selectors = {
  getTasks
};
