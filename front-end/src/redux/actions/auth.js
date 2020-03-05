import { createAction } from 'redux-actions';
import {
  DO_SIGNIN,
  DO_SIGNUP,
  DO_SIGNOUT,
  DO_UPDATE_PROFILE
} from '../constants/auth';

export const signin = createAction(DO_SIGNIN);

export const signup = createAction(DO_SIGNUP);

export const signout = createAction(DO_SIGNOUT, () => {
  localStorage.removeItem('travel_plans_auth');
});

export const updateProfile = createAction(DO_UPDATE_PROFILE);
