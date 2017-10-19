import { call, put, takeLatest } from 'redux-saga/effects';
import { constants } from 'app/~core/config';
import { Types } from '../actions';

const {
  OAuth: {
    OAUTH
  }
} = constants;

export default api => {
  function* fetchUserSaga() {
    try {
      const res = yield call(api.fetchUser);
      yield put({ type: Types.LOGIN_USER_FAILURE, res });
    } catch (err) {
      yield put({ type: Types.LOGIN_USER_FAILURE, err });
      throw new Error(err);
    }
  }

  function* loginSaga({ loginType, authParams: { oauthProviderName, email, password } }) {
    try {
      const res = loginType === OAUTH
        ? yield call(api.loginWithOAuth, oauthProviderName)
        : yield call(api.loginWithEmail, email, password);
      yield put({ type: Types.LOGOUT_USER_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.LOGIN_USER_FAILURE, err });
      throw new Error(err);
    }
  }

  function* logoutSaga() {
    try {
      yield call(api.logout);
      yield put({ type: Types.LOGOUT_USER_SUCCESS });
    } catch (err) {
      yield put({ type: Types.LOGOUT_USER_FAILURE, err });
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

  function* registerWithEmailSaga({ email, password }) {
    try {
      const res = yield call(api.registerWithEmail, email, password);
      yield put({ type: Types.REGISTER_WITH_EMAIL_SUCCESS, res });
    } catch (err) {
      yield put({ type: Types.REGISTER_WITH_EMAIL_FAILURE, err });
      throw new Error(err);
    }
  }

  function* newAdSaga({ email, password }) {
    try {
      yield call(api.registerWithEmail, email, password);
      yield put({ type: Types.NEW_AD_SUCCESS });
    } catch (err) {
      yield put({ type: Types.NEW_AD_FAILURE, err });
      throw new Error(err);
    }
  }

  function* saveAdToUserAdList({ uid, key }) {
    try {
      yield call(api.saveAdToUserAdList, uid, key);
      yield put({ type: Types.NEW_AD_SUCCESS });
    } catch (err) {
      yield put({ type: Types.NEW_AD_FAILURE, err });
      throw new Error(err);
    }
  }

  function* startWatchers() {
    yield takeLatest(Types.FETCH_USER_ATTEMPT, fetchUserSaga);
    yield takeLatest(Types.LOGIN_USER_ATTEMPT, loginSaga);
    yield takeLatest(Types.LOGOUT_USER_ATTEMPT, logoutSaga);
    yield takeLatest(Types.UPDATE_PASSWORD_ATTEMPT, updatePasswordSaga);
    yield takeLatest(Types.REGISTER_WITH_EMAIL_ATTEMPT, registerWithEmailSaga);
    yield takeLatest(Types.NEW_AD_ATTEMPT, newAdSaga);
    yield takeLatest(Types.SAVE_AD_TO_USER_AD_LIST_ATTEMPT, saveAdToUserAdList);
  }

  return startWatchers;
};
