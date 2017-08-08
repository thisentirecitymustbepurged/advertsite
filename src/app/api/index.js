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

const {
  paginationSetPagesFetched,
  paginationSetEndReached
} = Creators;

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

export function query(ref, filter) {
  const {
    orderBy,
    equalTo,
    limitToFirst,
    limitToLast,
    startAt,
    endAt
  } = filter;
  let q = dbRef(ref);
  switch (orderBy) {
    case 'child':
      q = q.orderByChild();
      break;
    case 'value':
      q = q.orderByValue();
      break;
    case 'key':
      q = q.orderByKey();
      break;
    default:
      q = q.orderByKey();
  }
  if (equalTo) {
    q = q.equalTo(equalTo);
  }
  if (limitToFirst) {
    q = q.limitToFirst(limitToFirst);
  }
  if (limitToLast) {
    q = q.limitToLast(limitToLast);
  }
  if (startAt) {
    q = q.startAt(startAt);
  }
  if (endAt) {
    q = q.endAt(endAt);
  }
  return q.once('value');
}

export function fetchAds() {
  const {
    pagination: {
      initialPageCount,
      itemsPerPage,
      activePage,
      pagesFetched,
      endReached
    },
    // filter: {
    //   categoryFilter,
    // },
    ads
  } = store.getState();

  if (endReached) return;

  // INITIAL CALL
  if (activePage === 1) {
    const numberToFetch = itemsPerPage * initialPageCount;
    const filters = {
      limitToFirst: numberToFetch
    };
    return query('/ads', filters).then(
      snapshot => handleAds(snapshot.val(), numberToFetch, true),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      }
    );
  }

  // NEXT CALL
  if (pagesFetched) {
    const lastKey = ads[ads.length - 1].key;
    const pageCountToFetch = (initialPageCount - 1) - (pagesFetched - activePage);
    const numberToFetch = (itemsPerPage * pageCountToFetch) + 1;
    const filters = {
      startAt: lastKey,
      limitToFirst: numberToFetch
    };
    return query('/ads', filters).then(
      snapshot => handleAds(snapshot.val(), numberToFetch),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      }
    );
  }

  function handleAds(fetchedAds, numberToFetch, isInitial) {
    const handledAds = Object.keys(fetchedAds).map(key => {
      const obj = Object.assign({}, fetchedAds[key]);
      obj.key = key;
      return obj;
    });

    if (isInitial) {
      if (handledAds.length < numberToFetch) {
        store.dispatch(paginationSetEndReached(true));
      }
      store.dispatch(fetchAdsSuccess(handledAds));
      store.dispatch(paginationSetPagesFetched(
        Math.ceil(handledAds.length / itemsPerPage)
      ));
    } else {
      if (handledAds.length < numberToFetch) {
        store.dispatch(paginationSetEndReached(true));
      }
      handledAds.shift();
      store.dispatch(fetchAdsSuccess(handledAds));
      store.dispatch(paginationSetPagesFetched(
        pagesFetched + Math.ceil(handledAds.length / itemsPerPage)
      ));
    }
  }
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
