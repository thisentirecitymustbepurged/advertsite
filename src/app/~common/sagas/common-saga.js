import { call, put, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions';

export default api => {
  function* uploadAdImageSaga({ uid }) {
    try {
      const res = yield call(api.getUserAds, uid);
      yield put({ type: Types.FETCH_USER_ADS_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.FETCH_USER_ADS_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(Types.FETCH_USER_ADS_ATTEMPT, uploadAdImageSaga);
  }

  return startWatchers;
}
