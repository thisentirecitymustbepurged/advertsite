import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  categoryFilter: null,
});

const filterByCategory = (state, { category }) =>
  state.merge({
    categoryFilter: category
  });

export default createReducer(INITIAL_STATE, {
  [Types.FILTER_BY_CATEGORY]: filterByCategory
});
