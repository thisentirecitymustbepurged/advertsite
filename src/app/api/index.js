import store from '../redux/store';

import auth from '../firebase/auth';
import db from '../firebase/db';
import stor from '../firebase/stor';

import {
  loginUserFailure,
  loginUserSuccess,
  fetchUserSuccess,
  fetchUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
} from '../redux/userAuth/actionCreators';

import {
  createUserAdSuccess,
  createUserAdFailure,
  fetchUserAdsSuccess,
  fetchUserAdsFailure,
  // updateUserAdSuccess,
  // updateUserAdFailure,
  deleteUserAdSuccess,
  deleteUserAdFailure,
  fetchAdsSuccess,
  fetchAdsFailure,
  clearUserAds,
} from '../redux/readWrite/actionCreators';

const {
  loginWithProvider,
  logoutUser,
} = auth;
const { dbRef } = db;
const { storRef } = stor;

// userAuth
export function loginWithFacebook() {
  loginWithProvider('facebook').then(
    snapshot => store.dispatch(loginUserSuccess(snapshot.user)),
    () => store.dispatch(loginUserFailure()),
  )
}

export function fetchUser() {
  auth.fetchUser().then(
    user => store.dispatch(fetchUserSuccess(user)),
    () => store.dispatch(fetchUserFailure()),
  )
}

export function logOut() {
  logoutUser().then(
    () => {
      store.dispatch(clearUserAds());
      store.dispatch(logoutUserSuccess());
    },
    () => store.dispatch(logoutUserFailure()),
  );
}

// readWrite
export function createNewAd(values, uid) {
  const image = values.image;
  delete values.image;
  const newAdKey = dbRef('ads').push().key;
  const updates = {};
  updates[`/ads/${newAdKey}`] = { ...values, uid: uid };
  updates[`/user_ads/${uid}/${newAdKey}`] = '';
  dbRef().update(updates).then(
    () => {
      const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key
      storRef(`/images/${newImageKey}`).put(image).then(
        snapshot => {
          const path = `/ads/${newAdKey}/images/${newImageKey}`;
          dbRef(path).set(snapshot.downloadURL).then(
            () => store.dispatch(createUserAdSuccess()),
            () => store.dispatch(createUserAdFailure()),
          );
        },
        () => this.props.createUserAdFailure(),
      );
    },
    () => this.props.createUserAdFailure(),
  )
}

export function fetchAds() {
  dbRef('/ads').once('value').then(
    snapshot => store.dispatch(fetchAdsSuccess(snapshot.val())),
    () => store.dispatch(fetchAdsFailure()),
  );
}

export function userAdsListener(uid) {
  const userAdsRef = dbRef(`/user_ads/${uid}`);
  userAdsRef.on('value',
    snapshot => store.dispatch(fetchUserAdsSuccess(snapshot.val())),
    () => store.dispatch(fetchUserAdsFailure()),
  );
  return userAdsRef;
}

export function deleteAd(uid, key) {
  const updates = {};
  updates[`/ads/${key}`] = null;
  updates[`/user_ads/${uid}/${key}`] = null;
  dbRef('/').update(updates).then(
    () => store.dispatch(deleteUserAdSuccess()),
    () => store.dispatch(deleteUserAdFailure()),
  );
}
