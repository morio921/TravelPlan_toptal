import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './modules/auth';

export default combineReducers({
  auth,
  form,
});
