import Firebase from '../../firebase/firebase'
import * as actionTypes from './firebaseUserAuthTypes'

export function fetchFirebaseUserSuccess(user) {
  return {
    type: actionTypes.FETCH_FIREBASE_USER_SUCCESS,
    user
  }
}
export function fetchFirebaseUserFailure(user) {
  return {
    type: actionTypes.FETCH_FIREBASE_USER_FAILURE,
    user
  }
}