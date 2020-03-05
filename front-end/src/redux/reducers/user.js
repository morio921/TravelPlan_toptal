import { handleActions } from 'redux-actions';
import { omit, reject } from 'lodash';
import { requestSuccess, requestFail } from '../api/request';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../constants/user';

const initialState = {
  user: null,
  status: 'INIT',
  users: [],
  params: {
    count: 0,
    page_size: 10,
    page: 1
  },
  error: null
};

export default handleActions({
  [requestSuccess(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USER),
    user: payload,
    error: null
  }),

  [requestFail(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USER),
    error: payload
  }),

  [requestSuccess(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USERS),
    users: payload.results,
    params: {
      count: payload.count,
      ...state.params,
      ...omit(payload, 'results')
    },
    error: null
  }),

  [requestFail(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USERS),
    error: payload
  }),

  [requestSuccess(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_USER),
    user: payload,
    error: null
  }),

  [requestFail(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_USER),
    error: payload
  }),

  [requestSuccess(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_USER),
    user: payload,
    error: null
  }),

  [requestFail(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_USER),
    error: payload
  }),

  [requestSuccess(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_USER),
    users: reject(state.users, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0)
    },
    error: null
  }),

  [requestFail(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_USER),
    error: payload
  }),

}, initialState)
