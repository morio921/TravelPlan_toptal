import { get } from 'lodash';

export const authStateSelector = (state) =>
  get(state, 'auth')

export const userDetailSelector = (state) =>
  get(state, 'user.user', {})

export const usersListSelector = (state) =>
  get(state, 'user.users', [])

export const userStateSelector = (state) =>
  get(state, 'user', {})

export const reportSelector = (state) =>
  get(state, 'user.report', {})

export const usersParamsSelector = (state) =>
  get(state, 'user.params', {})

export const profileSelector = (state) =>
  get(state, 'auth.me', null)

export const recordDetailSelector = (state) =>
  get(state, 'record.record', {})

export const recordsListSelector = (state) =>
  get(state, 'record.records', [])

export const recordStateSelector = (state) =>
  get(state, 'record', {})

export const recordsParamsSelector = (state) =>
  get(state, 'record.params', {})
