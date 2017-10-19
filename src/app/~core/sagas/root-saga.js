/* eslint-disable import/first */
import { all } from 'redux-saga/effects';
import api from '../services/api';

import coreSaga from './core-saga';
// import { sagas as homeSagas } from 'app/home';

export default function* rootSaga() {
  yield all([
    coreSaga(api)(),
    // homeSagas(api).startWatchers()
  ]);
}
