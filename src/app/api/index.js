import store from '../redux/store';

import auth from '../firebase/auth';
import db from '../firebase/db';
import stor from '../firebase/stor';

import {
  fetchUserSuccess,
  fetchUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
} from '../redux/userAuth/actionCreators';

import {
  clearUserAds,
} from '../redux/readWrite/actionCreators';


const { dbRef } = db;
const { storRef } = stor;

export function createNewAd(values, uid) {
  return new Promise ((resolve, reject) => {
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
              () => resolve(),
              error => reject(),
            );
          },
          error => reject(),
        );
      },
      error => reject(),
    )
  });
}

export function fetchUser() {
  auth.fetchUser().then(
    user => store.dispatch(fetchUserSuccess(user)),
    () => store.dispatch(fetchUserFailure()),
  )
}

export function logOut() {
  auth.logoutUser().then(
    () => {
      store.dispatch(clearUserAds());
      store.dispatch(logoutUserSuccess());
    },
    () => store.dispatch(logoutUserFailure()),
  );
}
