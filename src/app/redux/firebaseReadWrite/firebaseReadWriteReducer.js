import * as actionTypes from './firebaseReadWriteTypes'

export default function (state = null, action) {
  switch (action.type) {

    case actionTypes.FETCH_FIREBASE_ITEMS_SUCCESS:
      return action.items;
    case actionTypes.FETCH_FIREBASE_ITEMS_FAILURE:
      return state;

    case actionTypes.FETCH_FIREBASE_USER_ITEMS_SUCCESS:
      return action.items;
    case actionTypes.FETCH_FIREBASE_USER_ITEMS_FAILURE:
      return state;

    case actionTypes.CREATE_FIREBASE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.CREATE_FIREBASE_USER_ITEM_FAILURE:
      return state;

    case actionTypes.UPDATE_FIREBASE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.UPDATE_FIREBASE_USER_ITEM_FAILURE:
      return state;

    case actionTypes.DELETE_FIREBASE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.DELETE_FIREBASE_USER_ITEM_FAILURE:
      return state;

    default:
      return state;
  }
}