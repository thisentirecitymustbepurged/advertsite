import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from '../actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: false,
  attempting: false
});

const fetchUserAdsAttempt = (state) =>
  state.merge({
    attempting: true
  });

const fetchUserAdsSuccess = (state, { data }) =>
  state.merge({
    data,
    attempting: false
  });

const fetchUserAdsFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });


const deleteAdAttempt = (state) =>
  state.merge({
    deleteAd_attempting: true
  });

const deleteAdSuccess = (state) =>
  state.merge({
    deleteAd_attempting: false
  });

const deleteAdFailure = (state, { err }) =>
  state.merge({
    err,
    deleteAd_attempting: false
  });


const updatePasswordAttempt = (state) =>
  state.merge({
    updatingPassword: true
  });

const updatePasswordSuccess = (state) =>
  state.merge({
    updatingPassword: false
  });

const updatePasswordFailure = (state, { error }) =>
  state.merge({
    error,
    updatingPassword: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_USER_ADS_ATTEMPT]: fetchUserAdsAttempt,
  [Types.FETCH_USER_ADS_SUCCESS]: fetchUserAdsSuccess,
  [Types.FETCH_USER_ADS_FAILURE]: fetchUserAdsFailure,

  [Types.DELETE_AD_ATTEMPT]: deleteAdAttempt,
  [Types.DELETE_AD_SUCCESS]: deleteAdSuccess,
  [Types.DELETE_AD_FAILURE]: updatePasswordFailure,

  [Types.UPDATE_PASSWORD_ATTEMPT]: updatePasswordAttempt,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
  [Types.UPDATE_PASSWORD_FAILURE]: updatePasswordFailure,
});
