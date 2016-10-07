import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth';
import scheduler from './scheduler';

export default combineReducers({
  auth: authReducer,
  form,
  scheduler
});
