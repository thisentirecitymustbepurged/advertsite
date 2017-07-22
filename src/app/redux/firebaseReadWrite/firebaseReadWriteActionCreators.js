import * as actionTypes from './firebaseReadWriteTypes'

export function fetchFirebaseItemsSuccess(items) {
  return {
    type: actionTypes.FETCH_FIREBASE_ITEMS_SUCCESS,
    items
  }
}
export function fetchFirebaseItemsFailure() {
  return {
    type: actionTypes.FETCH_FIREBASE_ITEMS_FAILURE,
  }
}

export function fetchFirebaseUserItemsSuccess(items) {  
  return {
    type: actionTypes.FETCH_FIREBASE_USER_ITEMS_SUCCESS,
    items
  }
}
export function fetchFirebaseUserItemsFailure() {
  return {
    type: actionTypes.FETCH_FIREBASE_USER_ITEMS_FAILURE,   
  }
}

export function createFirebaseUserItemSuccess() {  
  return {
    type: actionTypes.CREATE_FIREBASE_USER_ITEM_SUCCESS,    
  }
}
export function createFirebaseUserItemFailure() {
  return {
    type: actionTypes.CREATE_FIREBASE_USER_ITEM_FAILURE,   
  }
}

export function updateFirebaseUserItemSuccess() {  
  return {
    type: actionTypes.UPDATE_FIREBASE_USER_ITEM_SUCCESS,    
  }
}
export function updateFirebaseUserItemFailure() {
  return {
    type: actionTypes.UPDATE_FIREBASE_USER_ITEM_FAILURE,   
  }
}

export function deleteFirebaseUserItemSuccess() {  
  return {
    type: actionTypes.DELETE_FIREBASE_USER_ITEM_SUCCESS,   
  }
}
export function deleteFirebaseUserItemFailure() {
  return {
    type: actionTypes.DELETE_FIREBASE_USER_ITEM_FAILURE,   
  }
}