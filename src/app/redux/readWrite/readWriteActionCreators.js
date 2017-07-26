import * as actionTypes from './readWriteTypes';

export function fetchItemsSuccess(items) {
  return {
    type: actionTypes.FETCH_ITEMS_SUCCESS,
    items,
  };
}
export function fetchItemsFailure() {
  return {
    type: actionTypes.FETCH_ITEMS_FAILURE,
  };
}

export function fetchUserItemsSuccess(items) {
  return {
    type: actionTypes.FETCH_USER_ITEMS_SUCCESS,
    items,
  };
}
export function fetchUserItemsFailure() {
  return {
    type: actionTypes.FETCH_USER_ITEMS_FAILURE,
  };
}

export function createUserItemSuccess() {
  return {
    type: actionTypes.CREATE_USER_ITEM_SUCCESS,
  };
}
export function createUserItemFailure() {
  return {
    type: actionTypes.CREATE_USER_ITEM_FAILURE,
  };
}

export function updateUserItemSuccess() {
  return {
    type: actionTypes.UPDATE_USER_ITEM_SUCCESS,
  };
}
export function updateUserItemFailure() {
  return {
    type: actionTypes.UPDATE_USER_ITEM_FAILURE,
  };
}

export function deleteUserItemSuccess() {
  return {
    type: actionTypes.DELETE_USER_ITEM_SUCCESS,
  };
}
export function deleteUserItemFailure() {
  return {
    type: actionTypes.DELETE_USER_ITEM_FAILURE,
  };
}
