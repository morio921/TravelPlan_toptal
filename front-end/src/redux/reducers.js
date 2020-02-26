import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './modules/auth';
import user from './modules/user';
import record from './modules/record';

export default combineReducers({
  auth,
  user,
  record,
  form,
});
