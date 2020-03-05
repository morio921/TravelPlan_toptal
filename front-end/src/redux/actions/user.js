import { createAction } from 'redux-actions';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants/user';

export const getUser = createAction(GET_USER);

export const getUsers = createAction(GET_USERS);

export const createUser = createAction(CREATE_USER);

export const updateUser = createAction(UPDATE_USER);

export const deleteUser = createAction(DELETE_USER);
