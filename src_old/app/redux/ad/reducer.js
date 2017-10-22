import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: null,
  attempting: false
});

const fetchAdAttempt = (state) =>
  state.merge({
    attempting: true
  });
const fetchAdSuccess = (state, { data }) =>
  state.merge({
    data,
    attempting: false
  });
const fetchAdFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

const checkIfUserIsOwnerAttempt = (state) =>
  state.merge({
    attempting: true
  });
const checkIfUserIsOwnerSuccess = (state, { isOwner }) =>
  state.merge({
    isOwner,
    attempting: false
  });
const checkIfUserIsOwnerFailure = (state, { err }) =>
  state.merge({
    err,
    attempting: false
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_AD_ATTEMPT]: fetchAdAttempt,
  [Types.FETCH_AD_SUCCESS]: fetchAdSuccess,
  [Types.FETCH_AD_FAILURE]: fetchAdFailure,

  [Types.CHECK_IF_USER_IS_OWNER_ATTEMPT]: checkIfUserIsOwnerAttempt,
  [Types.CHECK_IF_USER_IS_OWNER_SUCCESS]: checkIfUserIsOwnerSuccess,
  [Types.CHECK_IF_USER_IS_OWNER_FAILURE]: checkIfUserIsOwnerFailure,
});
