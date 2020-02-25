import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './modules/auth';
import user from './modules/user';

export default combineReducers({
  auth,
  user,
  form,
});
