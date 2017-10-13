import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from '../actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: false,
  attempting: false
});

const fetchAdsAttempt = (state) =>
  state.merge({
    attempting: true
  });

const fetchAdsSuccess = (state, { data }) =>
  state.merge({
    data,
    attempting: false
  });

const fetchAdsFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_ADS_ATTEMPT]: fetchAdsAttempt,
  [Types.FETCH_ADS_SUCCESS]: fetchAdsSuccess,
  [Types.FETCH_ADS_FAILURE]: fetchAdsFailure,
});
