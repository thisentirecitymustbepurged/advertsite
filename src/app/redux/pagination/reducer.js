import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  itemsPerPage: 10,
  activePage: 1,
  adsCount: null,
});

// Community users
const paginationSetItemsPerPage = (state, { itemsPerPage }) =>
  state.merge({
    itemsPerPage,
  });

const paginationSetActivePage = (state, { activePage }) =>
  state.merge({
    activePage,
  });

const paginationSetAdsCount = (state, { adsCount }) =>
  state.merge({
    adsCount,
  });

export default createReducer(INITIAL_STATE, {
  [Types.PAGINATION_SET_ITEMS_PER_PAGE]: paginationSetItemsPerPage,
  [Types.PAGINATION_SET_ACTIVE_PAGE]: paginationSetActivePage,
  [Types.PAGINATION_SET_ADS_COUNT]: paginationSetAdsCount,
});
