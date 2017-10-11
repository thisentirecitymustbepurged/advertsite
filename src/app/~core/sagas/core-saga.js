import { call, put, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions';
import Auth from '../config';

const {
  OAUTH
} = Auth;

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

  function* startWatchers() {
    yield takeLatest(Types.FETCH_USER_ATTEMPT, fetchUserSaga);
    yield takeLatest(Types.LOGIN_USER_ATTEMPT, loginSaga);
    yield takeLatest(Types.LOGOUT_USER_ATTEMPT, logoutSaga);
    yield takeLatest(Types.UPDATE_PASSWORD_ATTEMPT, updatePasswordSaga);
    yield takeLatest(Types.REGISTER_WITH_EMAIL_ATTEMPT, registerWithEmailSaga);
  }

  return startWatchers;
}
