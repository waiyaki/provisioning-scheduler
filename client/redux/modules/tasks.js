import R from 'ramda';

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

const UPDATE_TASK_REQUEST = 'scheduler/tasks/UPDATE_TASK_REQUEST';
const UPDATE_TASK_SUCCESS = 'scheduler/tasks/UPDATE_TASK_SUCCESS';
const UPDATE_TASK_FAILURE = 'scheduler/tasks/UPDATE_TASK_FAILURE';

const updateItems = (item, items) =>
  R.update(R.findIndex(R.propEq('id', item.id), items), item, items);

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
    case FETCH_TASKS_REQUEST:
    case FETCH_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
      return { ...state, isFetching: true, error: null };

    case CREATE_TASK_SUCCESS:
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: [action.payload, ...state.items]
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: updateItems(action.payload, state.items)
      };

    case CREATE_TASK_FAILURE:
    case FETCH_TASKS_FAILURE:
    case FETCH_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...action.payload, ...state.items],
        error: null
      };

    default:
      return state;
  }
}

// Selectors
const getTasks = R.prop('tasks');
const getPropFromTasks = R.curry(
  (p, state) => R.compose(R.prop(p), getTasks)(state)
);

// Using a getItems selector to allow for freedom to change the internal
// representation of the items in the state.
const getItems = getPropFromTasks('items');

const getItemById = R.curry((taskId, state) =>
  R.compose(R.find(R.propEq('id', Number(taskId))), getItems)(state)
);

export const selectors = {
  getTasks,
  getItems,
  getItemById,
  getPropFromTasks
};

// Actions
const interceptAndDoSomething = (
  onSucess,
  onError = f => f,
  apiCall
) => (client) => apiCall(client)
  .then(response => {
    onSucess(response);
    return response;
  })
  .catch(err => {
    onError(err);
    return Promise.reject(err);
  });

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

// This functin eventually returns a promise for easier chaining
// in the components.
export function createTask(data) {
  return (dispatch) => new Promise((resolve, reject) => dispatch({
    types: [CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE],
    callApi: interceptAndDoSomething(
      resolve,
      reject,
      client => client.post('/api/scheduled-tasks', data)
    ),
    meta: { authenticate: true }
  }));
}

export function updateTask(data) {
  return (dispatch) => new Promise((resolve, reject) => dispatch({
    types: [UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE],
    callApi: interceptAndDoSomething(
      resolve,
      reject,
      client => client.put(
        `/api/scheduled-tasks/${data.id}`, R.omit('user', data)
      )
    ),
    meta: { authenticate: true }
  }));
}
