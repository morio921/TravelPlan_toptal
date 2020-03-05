import { handleActions } from 'redux-actions';
import { requestSuccess, requestFail } from '../api/request';
import {
  DO_SIGNIN,
  DO_SIGNUP,
  DO_SIGNOUT,
  DO_UPDATE_PROFILE
} from '../constants/auth';

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
