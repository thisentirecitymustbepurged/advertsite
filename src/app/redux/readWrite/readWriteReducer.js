import * as actionTypes from './readWriteTypes';

export function userReadWriteReducer (state = null, action) {
  switch (action.type) {

    case actionTypes.FETCH_USER_ADS_SUCCESS:
      return action.Ads;
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

    default:
      return state;
  }
}

export function readWriteReducer (state = null, action) {
  switch (action.type) {

    case actionTypes.FETCH_ADS_SUCCESS:
      return action.Ads;
    case actionTypes.FETCH_ADS_FAILURE:
      return state;

    default:
      return state;
  }
}
