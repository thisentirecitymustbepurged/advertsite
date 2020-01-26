import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from '../actions';

export const INITIAL_STATE = Immutable({
  ads: {},
  error: {},
  isOwner: false,
  attempting: false
});

const getAdsAttempt = (state) =>
  state.merge({
    attempting: true
  });

const getAdsSuccess = (state, { ads }) =>
  state.merge({
    ads,
    attempting: false
  });

const getAdsFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.GET_ADS_ATTEMPT]: getAdsAttempt,
  [Types.GET_ADS_SUCCESS]: getAdsSuccess,
  [Types.GET_ADS_FAILURE]: getAdsFailure,
});
