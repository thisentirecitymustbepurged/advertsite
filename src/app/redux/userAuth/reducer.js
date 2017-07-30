import * as actionTypes from './types';

export default function (state = {}, action) {
  switch (action.type) {

    case actionTypes.FETCH_USER_SUCCESS:
      return action.user;
    case actionTypes.FETCH_USER_FAILURE:
      return state;

    case actionTypes.LOGOUT_USER_SUCCESS:
      debugger;
      return null;
    case actionTypes.LOGOUT_USER_FAILURE:
      return state;

    case actionTypes.LOGIN_USER_SUCCESS:
      return action.user;
    case actionTypes.LOGIN_USER_FAILURE:
      return state;

    default:
      return state;
  }
}
