import { prop, compose, propEq, find, curry } from 'ramda';

const INITIAL_STATE = {
  isFetching: false,
  items: [],
  error: null
};

const CREATE_TASK_REQUEST = 'scheduler/tasks/CREATE_TASK_REQUEST';
const CREATE_TASK_SUCCESS = 'scheduler/tasks/CREATE_TASK_SUCCESS';
const CREATE_TASK_FAILURE = 'scheduler/tasks/CREATE_TASK_FAILURE';

const FETCH_TASKS_REQUEST = 'scheduler/tasks/FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'scheduler/tasks/FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'scheduler/tasks/FETCH_TASKS_FAILURE';

const FETCH_TASK_REQUEST = 'scheduler/tasks/FETCH_TASK_REQUEST';
const FETCH_TASK_SUCCESS = 'scheduler/tasks/FETCH_TASK_SUCCESS';
const FETCH_TASK_FAILURE = 'scheduler/tasks/FETCH_TASK_FAILURE';

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
    case FETCH_TASKS_REQUEST:
    case FETCH_TASK_REQUEST:
      return { ...state, isFetching: true, error: null };

    case CREATE_TASK_SUCCESS:
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: [action.payload, ...state.items]
      };

    case CREATE_TASK_FAILURE:
    case FETCH_TASKS_FAILURE:
    case FETCH_TASK_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state, isFetching: false, items: action.payload, error: null
      };

    default:
      return state;
  }
}

// Selectors
const getTasks = prop('tasks');
const getPropFromTasks = curry((p, state) => compose(prop(p), getTasks)(state));

// Using a getItems selector to allow for freedom to change the internal
// representation of the items in the state.
const getItems = getPropFromTasks('items');

const getItemById = curry(
  (taskId, state) => compose(
    find(propEq('id', Number(taskId))),
    getItems
  )(state)
);

export const selectors = {
  getTasks,
  getItems,
  getItemById,
  getPropFromTasks
};

// Actions
export function fetchTasks() {
  return (dispatch, getState) => {
    const items = getItems(getState());
    return !items.length && dispatch({
      types: [FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE],
      callApi: client => client.get('/api/scheduled-tasks'),
      meta: { authenticate: true }
    });
  };
}

export function fetchTask(taskId) {
  return (dispatch, getState) => {
    const state = getState();
    const fetching = getPropFromTasks('isFetching', state);
    const task = getItemById(taskId, state);
    return !task && !fetching && dispatch({
      types: [FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE],
      callApi: client => client.get(`/api/scheduled-tasks/${taskId}`),
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
