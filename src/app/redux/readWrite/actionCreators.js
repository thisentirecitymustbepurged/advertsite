import * as actionTypes from './types';

export function fetchAdSuccess(ad) {
  return {
    type: actionTypes.FETCH_AD_SUCCESS,
    ad,
  };
}
export function fetchAdFailure() {
  return {
    type: actionTypes.FETCH_AD_FAILURE,
  };
}
export function userIsOwner(isOwner) {
  return {
    type: actionTypes.USER_IS_OWNER,
    isOwner
  }
}


export function fetchAdsSuccess(ads) {
  return {
    type: actionTypes.FETCH_ADS_SUCCESS,
    ads,
  };
}
export function fetchAdsFailure() {
  return {
    type: actionTypes.FETCH_ADS_FAILURE,
  };
}

export function fetchUserAdsSuccess(ads) {
  return {
    type: actionTypes.FETCH_USER_ADS_SUCCESS,
    ads,
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

export function clearAds() {
  return {
    type: actionTypes.CLEAR_ADS,
  };
}

export function clearUserAds() {
  return {
    type: actionTypes.CLEAR_USER_ADS,
  };
}

