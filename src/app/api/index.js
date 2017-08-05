import axios from 'axios';

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

import { Creators } from '../redux/pagination/actions';

const { paginationSetAdsKeys } = Creators;

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
  );
}

export function fetchUser() {
  onAuthStateChanged().then(
    user => store.dispatch(fetchUserSuccess(user)),
    error => {
      store.dispatch(fetchUserFailure());
      throw new Error(error);
    },
  );
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
  const images = values.images;
  delete values.images; //eslint-disable-line
  const newAdKey = dbRef('ads').push().key;
  const newAd = {};
  newAd[`/ads/${newAdKey}`] = { ...values };
  newAd[`/user_ads/${uid}/${newAdKey}`] = { ...values };
  dbRef().update(newAd).then(
    () => {
      const handleImageUpload = (image, resolve, reject) => {
        const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key;
        storRef(`/images/${newImageKey}`).put(image).then(
          snapshot => {
            const pathAds = `/ads/${newAdKey}/images/${newImageKey}`;
            const pathUserAds = `/user_ads/${uid}/${newAdKey}/images/${newImageKey}`;
            const imgUrl = {};
            imgUrl[pathAds] = snapshot.downloadURL;
            imgUrl[pathUserAds] = snapshot.downloadURL;
            dbRef().update(imgUrl).then(
              () => resolve(),
              error => reject(error),
            );
          },
          error => reject(error),
        );
      };

      const promiseList = Object.keys(images).map(key => {
        const image = images[key];
        const promise = new Promise((resolve, reject) => {
          handleImageUpload(image, resolve, reject);
        });
        return promise;
      });

      Promise.all(promiseList).then(
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
}

export function fetchAd(adKey) {
  dbRef(`ads/${adKey}`).once('value').then(
    snapshot => store.dispatch(fetchAdSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchAdFailure());
      throw new Error(error);
    },
  );
}

export function fetchAdsShallow() {
  axios.get('https://adwebsite-928a9.firebaseio.com/ads.json?shallow=true', {
    headers: {
      'cross-domain': true,
    },
  })
    .then(
      data => store.dispatch(paginationSetAdsKeys(data)),
    );
}

export function fetchAds() {
  fetchAdsShallow();
  dbRef('/ads').once('value').then(
    snapshot => store.dispatch(fetchAdsSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchAdsFailure());
      throw new Error(error);
    },
  );
}

export function fetchUserAds() {
  onAuthStateChanged().then(
    () => {
      const uid = store.getState().user.uid;
      dbRef(`/user_ads/${uid}`).once('value').then(
        snapshot => {
          store.dispatch(fetchUserAdsSuccess(snapshot.val()));
        },
        error => {
          store.dispatch(fetchUserAdsFailure());
          throw new Error(error);
        },
      );
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
