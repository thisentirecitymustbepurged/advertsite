import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from '../actions';

export const INITIAL_STATE = Immutable({
  data: {},
  error: {},
  isOwner: false,
  attempting: false
});

const log = (state) => {
  return state;
};

export default createReducer(INITIAL_STATE, {
  [Types.LOG]: log
});
