import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = Immutable({});

const setAdsFilter = (state, { filter }) =>
  state.merge({
    ...filter
  });

export default createReducer(INITIAL_STATE, {
  [Types.SET_ADS_FILTER]: setAdsFilter
});
