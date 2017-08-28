import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  data: [],
  userAds: {},
  error: {},
  attempting: false
});

// FETCH ADS
const fetchAdsAttempt = (state) =>
  state.merge({
    attempting: true
  });
const fetchAdsSuccess = (state, { data }) =>
  state.merge({
    data: state.data.concat(data),
    attempting: false
  });
const fetchAdsFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

// FETCH USER ADS
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

// CLEAR ADS
const clearAds = (state) =>
  state.merge({
    data: {}
  });
const clearUserAds = (state) =>
  state.merge({
    userAds: {}
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_ADS_ATTEMPT]: fetchAdsAttempt,
  [Types.FETCH_ADS_SUCCESS]: fetchAdsSuccess,
  [Types.FETCH_ADS_FAILURE]: fetchAdsFailure,

  [Types.FETCH_USER_ADS_ATTEMPT]: fetchUserAdsAttempt,
  [Types.FETCH_USER_ADS_SUCCESS]: fetchUserAdsSuccess,
  [Types.FETCH_USER_ADS_FAILURE]: fetchUserAdsFailure,

  [Types.CLEAR_ADS]: clearAds,
  [Types.CLEAR_USER_ADS]: clearUserAds,
});

