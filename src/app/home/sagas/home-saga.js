import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../actions';

export default api => {
  function* getAdsSaga({ params }) {
    try {
      const res = yield call(api.getAds, params);
      yield put({ type: types.GET_ADS_SUCCESS, ads: res.val() });
    } catch (err) {
      yield put({ type: types.GET_ADS_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(types.GET_ADS_ATTEMPT, getAdsSaga);
  }

  return startWatchers;
};
