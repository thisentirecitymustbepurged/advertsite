import { call, put, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions';

export default api => {
  function* getAdsSaga({ params }) {
    try {
      const res = yield call(api.getAds, params);
      yield put({ type: Types.FETCH_ADS_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.FETCH_ADS_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(Types.FETCH_AD_ATTEMPT, getAdsSaga);
  }

  return startWatchers;
}
