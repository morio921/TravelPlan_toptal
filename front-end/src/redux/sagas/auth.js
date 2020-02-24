import { takeLatest } from 'redux-saga/effects';
import { DO_SIGNIN, DO_SIGNUP } from '../modules/auth';
import apiCall from '../api/apiCall';

const doSignin = apiCall({
  type: DO_SIGNIN,
  method: 'post',
  path: () => '/auth/signin',
  success: (res, action) => {
    localStorage.setItem('travel_plans_auth', JSON.stringify(res.data));
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/signup',
  success: () => {
    localStorage.removeItem('travel_plans_auth');
  },
  fail: () => {
    localStorage.removeItem('travel_plans_auth');
  }
})

export default function* rootSaga () {
  yield takeLatest(DO_SIGNIN, doSignin)
  yield takeLatest(DO_SIGNUP, doSignup)
}
