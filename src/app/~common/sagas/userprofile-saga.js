import { call, put, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions';

export default api => {
  function* getUserAdsSaga({ uid }) {
    try {
      const res = yield call(api.getUserAds, uid);
      yield put({ type: Types.FETCH_USER_ADS_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.FETCH_USER_ADS_FAILURE, err });
      throw new Error(err);
    }
  }

  function* deleteAdSaga({ key }) {
    try {
      yield call(api.deleteAd, key);
      yield put({ type: Types.DELETE_AD_SUCCESS });
    } catch (err) {
      yield put({ type: Types.DELETE_AD_FAILURE, err });
      throw new Error(err);
    }
  }

  function* updatePasswordSaga({ newPassword }) {
    try {
      yield call(api.updatePassword, newPassword);
      yield put({ type: Types.UPDATE_PASSWORD_SUCCESS });
    } catch (err) {
      yield put({ type: Types.UPDATE_PASSWORD_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(Types.FETCH_USER_ADS_ATTEMPT, getUserAdsSaga);
    yield takeLatest(Types.DELETE_AD_ATTEMPT, deleteAdSaga);
    yield takeLatest(Types.UPDATE_PASSWORD_ATTEMPT, updatePasswordSaga);
  }

  return startWatchers;
}
