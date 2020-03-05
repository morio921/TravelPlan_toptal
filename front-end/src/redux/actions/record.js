import { createAction } from 'redux-actions';
import {
  GET_RECORD,
  GET_RECORDS,
  GET_FUTURE_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD
} from '../constants/record';

export const getRecord = createAction(GET_RECORD);

export const getRecords = createAction(GET_RECORDS);

export const getFutureRecords = createAction(GET_FUTURE_RECORDS);

export const createRecord = createAction(CREATE_RECORD);

export const updateRecord = createAction(UPDATE_RECORD);

export const deleteRecord = createAction(DELETE_RECORD);
