import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import user from './user';
import record from './record';

export default combineReducers({
  auth,
  user,
  record,
  form,
});
