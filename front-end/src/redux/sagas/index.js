import { all } from 'redux-saga/effects';
import auth from './auth';
import user from './user';
import record from './record';

export default function* rootSaga () {
  yield all([
    auth(),
    user(),
    record()
  ])
}
