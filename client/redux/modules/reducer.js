import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth';
import tasks from './tasks';

export default combineReducers({
  auth: authReducer,
  form,
  tasks
});
