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

const fetchAdSuccess = (state, { ad }) =>
  state.merge({
    ad,
  });
const fetchAdFailure = (state, { error }) =>
  state.merge({
    error
  });

const checkIfUserIsOwnerSuccess = (state, { isOwner }) =>
  state.merge({
    isOwner,
  });
const checkIfUserIsOwnerFailure = (state, { error }) =>
  state.merge({
    error
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

export function userReadWrite(state = {}, { type, ads }) {
  switch (type) {
    case actionTypes.FETCH_USER_ADS_SUCCESS:
      return ads ? ads : {}; //eslint-disable-line
    case actionTypes.FETCH_USER_ADS_FAILURE:
      return state;

    case actionTypes.CREATE_USER_AD_SUCCESS:
      return state;
    case actionTypes.CREATE_USER_AD_FAILURE:
      return state;

    case actionTypes.UPDATE_USER_AD_SUCCESS:
      return state;
    case actionTypes.UPDATE_USER_AD_FAILURE:
      return state;

    case actionTypes.DELETE_USER_AD_SUCCESS:
      return state;
    case actionTypes.DELETE_USER_AD_FAILURE:
      return state;

    case actionTypes.CLEAR_USER_ADS:
      return {};

    default:
      return state;
  }
}

export function fetchAllAds(state = [], { type, ads }) {
  switch (type) {
    case actionTypes.FETCH_ADS_SUCCESS:
      return ads ? state.concat(ads) : state;
    case actionTypes.FETCH_ADS_FAILURE:
      return state;
    case actionTypes.CLEAR_ADS:
      return [];

    default:
      return state;
  }
}

export function fetchAd(state = {}, { type, ad, isOwner }) {
  switch (type) {
    case actionTypes.FETCH_AD_SUCCESS:
      return ad || {};
    case actionTypes.FETCH_AD_FAILURE:
      const newAd = { ...state, ad };
      return newAd;
    case actionTypes.USER_IS_OWNER:
      const newState = { ...state, isOwner };
      return newState;

    default:
      return state;
  }
}
