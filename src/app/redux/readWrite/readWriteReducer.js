import * as actionTypes from './readWriteTypes';

export function userReadWriteReducer (state = null, action) {
  switch (action.type) {

    case actionTypes.FETCH_USER_ITEMS_SUCCESS:
      return action.items;
    case actionTypes.FETCH_USER_ITEMS_FAILURE:
      return state;

    case actionTypes.CREATE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.CREATE_USER_ITEM_FAILURE:
      return state;

    case actionTypes.UPDATE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.UPDATE_USER_ITEM_FAILURE:
      return state;

    case actionTypes.DELETE_USER_ITEM_SUCCESS:
      return state;
    case actionTypes.DELETE_USER_ITEM_FAILURE:
      return state;

    default:
      return state;
  }
}

export function readWriteReducer (state = null, action) {
  switch (action.type) {

    case actionTypes.FETCH_ITEMS_SUCCESS:
      return action.items;
    case actionTypes.FETCH_ITEMS_FAILURE:
      return state;

    default:
      return state;
  }
}
