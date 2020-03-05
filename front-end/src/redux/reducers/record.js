import { handleActions } from 'redux-actions';
import { requestSuccess, requestFail } from '../api/request';
import { omit, reject } from 'lodash';
import {
  GET_RECORD,
  GET_RECORDS,
  GET_FUTURE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
} from '../constants/record';

const initialState = {
  record: null,
  status: 'INIT',
  records: [],
  params: {
    count: 0,
    page_size: 10,
    page: 1
  },
};

export default handleActions({
  [requestSuccess(GET_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(GET_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_RECORD),
    error: payload
  }),

  [requestSuccess(GET_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_RECORDS),
    records: payload.results,
    params: {
      count: payload.count,
      page: 1,
      page_size: state.params.page_size,
      ...omit(payload, 'results')
    },
    error: null
  }),

  [requestFail(GET_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_RECORDS),
    error: payload
  }),

  [requestSuccess(GET_FUTURE_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_FUTURE_RECORDS),
    records: payload.results,
    params: {
      count: payload.count,
      page: 1,
      page_size: state.params.page_size,
      ...omit(payload, 'results')
    },
    error: null
  }),

  [requestFail(GET_FUTURE_RECORDS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_FUTURE_RECORDS),
    error: payload
  }),

  [requestSuccess(CREATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(CREATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_RECORD),
    error: payload
  }),

  [requestSuccess(UPDATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_RECORD),
    record: payload,
    error: null
  }),

  [requestFail(UPDATE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_RECORD),
    error: payload
  }),

  [requestSuccess(DELETE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_RECORD),
    records: reject(state.records, { id: payload.id }),
    params: {
      count: Math.max(state.params.count - 1, 0),
      page: 1,
      page_size: state.params.page_size
    },
    error: null
  }),

  [requestFail(DELETE_RECORD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_RECORD),
    error: payload
  }),

}, initialState)
