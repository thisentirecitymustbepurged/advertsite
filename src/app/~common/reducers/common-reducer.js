import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from '../actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: false,
  attempting: false
});

const uploadAdImageAttempt = (state) =>
  state.merge({
    attempting: true
  });

const uploadAdImageSuccess = (state, { data }) =>
  state.merge({
    data,
    attempting: false
  });

const uploadAdImageFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_ADS_ATTEMPT]: uploadAdImageAttempt,
  [Types.FETCH_ADS_SUCCESS]: uploadAdImageSuccess,
  [Types.FETCH_ADS_FAILURE]: uploadAdImageFailure,
});
