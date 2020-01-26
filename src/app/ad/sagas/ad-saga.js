import { call, put, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions';

export default api => {
  function* getAdSaga({ key }) {
    try {
      const res = yield call(api.getAd, key);
      yield put({ type: Types.FETCH_AD_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.FETCH_AD_FAILURE, err });
      throw new Error(err);
    }
  }

  function*  updateAdSaga({ key, data }) {
    try {
      yield call(api.updateAd);
      yield put({ type: Types.CHECK_IF_USER_IS_OWNER_SUCCESS });
    } catch (err) {
      yield put({ type: Types.CHECK_IF_USER_IS_OWNER_FAILURE, err });
      throw new Error(err);
    }
  }

  function* checkIfUserIsOwnerSaga({ uid, key }) {
    try {
      yield call(api.checkIfUserIsOwner, uid, key);
      yield put({ type: Types.CHECK_IF_USER_IS_OWNER_SUCCESS });
    } catch (err) {
      yield put({ type: Types.CHECK_IF_USER_IS_OWNER_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(Types.FETCH_AD_ATTEMPT, getAdSaga);
    yield takeLatest(Types.UPDATE_AD_ATTEMPT, updateAdSaga);
    yield takeLatest(Types.CHECK_IF_USER_IS_OWNER_ATTEMPT, checkIfUserIsOwnerSaga);
  }

  return startWatchers;
}
