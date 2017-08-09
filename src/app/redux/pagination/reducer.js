import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  initialPageCount: 5,
  itemsPerPage: 6,
  activePage: 1,
  pagesFetched: 0,
  endReached: false,
  adsCount: null,
});

const paginationSetItemsPerPage = (state, { itemsPerPage }) =>
  state.merge({
    itemsPerPage,
  });

const paginationSetActivePage = (state, { activePage }) =>
  state.merge({
    activePage,
  });

const paginationSetPagesFetched = (state, { pagesFetched }) =>
  state.merge({
    pagesFetched,
  });

const paginationSetEndReached = (state, { endReached }) =>
  state.merge({
    endReached,
  });

const paginationSetAdsCount = (state, { adsCount }) =>
  state.merge({
    adsCount,
  });

export default createReducer(INITIAL_STATE, {
  [Types.PAGINATION_SET_ITEMS_PER_PAGE]: paginationSetItemsPerPage,
  [Types.PAGINATION_SET_ACTIVE_PAGE]: paginationSetActivePage,
  [Types.PAGINATION_SET_PAGES_FETCHED]: paginationSetPagesFetched,
  [Types.PAGINATION_SET_END_REACHED]: paginationSetEndReached,

  [Types.PAGINATION_SET_ADS_COUNT]: paginationSetAdsCount,
});
