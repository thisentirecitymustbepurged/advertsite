import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { types } from '../actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: false,
  attempting: false
});

const getAdsAttempt = (state) =>
  state.merge({
    attempting: true
  });

const getAdsSuccess = (state, { data }) =>
  state.merge({
    data,
    attempting: false
  });

const getAdsFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

export default createReducer(INITIAL_STATE, {
  [types.GET_ADS_ATTEMPT]: getAdsAttempt,
  [types.GET_ADS_SUCCESS]: getAdsSuccess,
  [types.GET_ADS_FAILURE]: getAdsFailure,
});
