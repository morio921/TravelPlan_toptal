import { createAction, handleActions } from 'redux-actions';
import { requestSuccess, requestFail } from '../api/request';

// ------------------------------------
// Constants
// ------------------------------------
export const DO_SIGNIN = 'DO_SIGNIN';
export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNOUT = 'DO_SIGNOUT';
export const DO_UPDATE_PROFILE = 'DO_UPDATE_PROFILE';

// ------------------------------------
// Actions
// ------------------------------------

export const signin = createAction(DO_SIGNIN);
export const signup = createAction(DO_SIGNUP);
export const signout = createAction(DO_SIGNOUT, () => {
  localStorage.removeItem('travel_plans_auth');
});
export const updateProfile = createAction(DO_UPDATE_PROFILE);

const getInitialState = () => {
  let authRestore = JSON.parse(localStorage.getItem('travel_plans_auth') || null)
  return authRestore ? {
    token: authRestore.token,
    me: authRestore.info,
    status: 'INIT',
    error: null
  } : {
    token: null,
    me: null,
    status: 'INIT',
    error: null
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(DO_SIGNIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_SIGNIN),
    me: payload.info
  }),

  [requestFail(DO_SIGNIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNIN),
    me: null,
    error: payload
  }),

  [DO_SIGNOUT]: (state, { payload }) => ({
    ...state,
    token: null,
    status: DO_SIGNOUT,
    me: null,
    error: null
  }),

  [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DO_SIGNUP),
    error: null
  }),

  [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNUP),
    me: null,
    error: payload
  }),

  [requestSuccess(DO_UPDATE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DO_UPDATE_PROFILE),
    user: payload.info,
    me: payload.info,
    error: null
  }),

  [requestFail(DO_UPDATE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DO_UPDATE_PROFILE),
    error: payload
  }),
}, getInitialState())
