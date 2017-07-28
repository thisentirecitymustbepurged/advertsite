import * as actionTypes from './readWriteTypes';

export function fetchAdsSuccess(Ads) {
  return {
    type: actionTypes.FETCH_ADS_SUCCESS,
    Ads,
  };
}
export function fetchAdsFailure() {
  return {
    type: actionTypes.FETCH_ADS_FAILURE,
  };
}

export function fetchUserAdsSuccess(Ads) {
  return {
    type: actionTypes.FETCH_USER_ADS_SUCCESS,
    Ads,
  };
}
export function fetchUserAdsFailure() {
  return {
    type: actionTypes.FETCH_USER_ADS_FAILURE,
  };
}

export function createUserAdSuccess() {
  return {
    type: actionTypes.CREATE_USER_AD_SUCCESS,
  };
}
export function createUserAdFailure() {
  return {
    type: actionTypes.CREATE_USER_AD_FAILURE,
  };
}

export function updateUserAdSuccess() {
  return {
    type: actionTypes.UPDATE_USER_AD_SUCCESS,
  };
}
export function updateUserAdFailure() {
  return {
    type: actionTypes.UPDATE_USER_AD_FAILURE,
  };
}

export function deleteUserAdSuccess() {
  return {
    type: actionTypes.DELETE_USER_AD_SUCCESS,
  };
}
export function deleteUserAdFailure() {
  return {
    type: actionTypes.DELETE_USER_AD_FAILURE,
  };
}
