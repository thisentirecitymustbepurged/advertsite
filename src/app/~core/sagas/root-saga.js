/* eslint-disable import/first */
import { all } from 'redux-saga/effects';
import api from '../services/api';

import coreSagas from './core-saga';
// import { sagas as homeSagas } from 'app/home';

export default function* rootSaga() {
  yield all([
    coreSagas(api).startWatchers(),
    // homeSagas(api).startWatchers()
  ]);
}