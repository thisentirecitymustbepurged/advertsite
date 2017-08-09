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
  clearAds
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
export function loginWithProvider(provider) {
  debugger;
  auth.loginWithProvider(provider).then(
    snapshot => {debugger;store.dispatch(loginUserSuccess(snapshot.user))},
    error => {
      debugger;
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
  let q = dbRef(ref);
  const {
    order,
    equalTo,
    limitToFirst,
    limitToLast,
    startAt,
    endAt
  } = filter;
  if (Object.keys(filter).length) {
    switch (order.by) {
      case 'key':
        q = q.orderByKey();
        break;
      case 'child':
        q = q.orderByChild(order.value);
        break;
      case 'value':
        q = q.orderByValue(order.value);
        break;
      default:
        throw new Error(`Something's wrong with query order object: ${order}`);
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
    filter,
    ads
  } = store.getState();
  const filterExists = Object.keys(filter).length;

  if (endReached) return;

  // INITIAL CALL
  if (activePage === 1) {
    const numberToFetch = itemsPerPage * initialPageCount;
    const f = () => {
      if (!filterExists) {
        return {
          order: {
            by: 'key'
          },
          limitToFirst: numberToFetch
        };
      }
      return {
        ...filter,
        limitToFirst: numberToFetch
      };
    };
    return query('/ads', f()).then(
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
    const f = () => {
      if (!filterExists) {
        return {
          order: {
            by: 'key'
          },
          limitToFirst: numberToFetch,
          startAt: lastKey
        };
      }
      return {
        ...filter,
        limitToFirst: numberToFetch,
        startAt: lastKey
      };
    };
    return query('/ads', f()).then(
      snapshot => handleAds(snapshot.val(), numberToFetch),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      }
    );
  }

  function handleAds(fetchedAds, numberToFetch, isInitial) {
    if (filterExists) {
      store.dispatch(clearAds());
    }
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
