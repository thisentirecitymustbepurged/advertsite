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
  fetchAdSuccess,
  fetchAdFailure,
  clearUserAds,
} from '../redux/readWrite/actionCreators';

const {
  logoutUser,
  onAuthStateChanged,
} = auth;
const { dbRef } = db;
const { storRef } = stor;

// userAuth
export function loginWithProvider() {
  auth.loginWithProvider('facebook').then(
    snapshot => store.dispatch(loginUserSuccess(snapshot.user)),
    error => {
      store.dispatch(loginUserFailure());
      throw new Error(error);
    },
  )
}

export function fetchUser() {
  onAuthStateChanged().then(
    user => store.dispatch(fetchUserSuccess(user)),
    error => {
      store.dispatch(fetchUserFailure());
      throw new Error(error);
    },
  )
}

export function logOut() {
  logoutUser().then(
    () => {

      store.dispatch(logoutUserSuccess());
      store.dispatch(clearUserAds());
    },
    error => {
      store.dispatch(logoutUserFailure());
      throw new Error(error);
    },
  );
}

// readWrite
export function createNewAd(values, uid) {
  const image = values.image;
  delete values.image;
  const newAdKey = dbRef('ads').push().key;
  const updates = {};
  updates[`/ads/${newAdKey}`] = { ...values };
  updates[`/user_ads/${uid}/${newAdKey}`] = '';
  dbRef().update(updates).then(
    () => {
      const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key
      storRef(`/images/${newImageKey}`).put(image).then(
        snapshot => {
          const path = `/ads/${newAdKey}/images/${newImageKey}`;
          dbRef(path).set(snapshot.downloadURL).then(
            () => store.dispatch(createUserAdSuccess()),
            error => {
              store.dispatch(createUserAdFailure());
              throw new Error(error);
            },
          );
        },
        error => {
          store.dispatch(createUserAdFailure());
          throw new Error(error);
        },
      );
    },
    error => {
      store.dispatch(createUserAdFailure());
      throw new Error(error);
    },
  )
}

export function fetchAd(adKey) {
  dbRef(`ads/${adKey}`).once('value').then(
    snapshot => store.dispatch(fetchAdSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchAdFailure());
      throw new Error(error);
    },
  )
}

export function fetchAds() {
  dbRef('/ads').once('value').then(
    snapshot => store.dispatch(fetchAdsSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchAdsFailure());
      throw new Error(error);
    },
  );
}

export function userAdsListener(uid) {
  const userAdsRef = dbRef(`/user_ads/${uid}`);
  userAdsRef.on('value',
    snapshot => store.dispatch(fetchUserAdsSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchUserAdsFailure());
      throw new Error(error);
    },
  );
  return userAdsRef;
}

export function deleteAd(uid, key) {
  const updates = {};
  updates[`/ads/${key}`] = null;
  updates[`/user_ads/${uid}/${key}`] = null;
  dbRef('/').update(updates).then(
    () => store.dispatch(deleteUserAdSuccess()),
    error => {
      store.dispatch(deleteUserAdFailure());
      throw new Error(error);
    },
  );
}
