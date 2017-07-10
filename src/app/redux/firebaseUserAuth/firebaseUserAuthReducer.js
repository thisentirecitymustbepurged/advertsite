import * as actionTypes from './firebaseUserAuthTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_FIREBASE_USER:     
      return action.user;
    default:
      return state;
  }
}