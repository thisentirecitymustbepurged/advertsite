import * as actionTypes from './types';

export function userReadWriteReducer (state = null, {type, ads}) {
  switch (type) {

    case actionTypes.FETCH_USER_ADS_SUCCESS:
      return ads;
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
      return null;

    default:
      return state;
  }
}

export function readWriteReducer (state = null, {type, ads}) {
  switch (type) {

    case actionTypes.FETCH_ADS_SUCCESS:
      return ads;
    case actionTypes.FETCH_ADS_FAILURE:
      return state;

    default:
      return state;
  }
}
