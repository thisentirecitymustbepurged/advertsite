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

export function fetchAd(adKey) {
  dbRef(`ads/${adKey}`).once('value').then(
    snapshot => store.dispatch(fetchAdSuccess(snapshot.val())),
    error => {
      store.dispatch(fetchAdFailure());
      throw new Error(error);
    },
  );
}

export function fetchAds() {
  const {
    pagination: {
      itemsPerPage,
      activePage,
      pagesFetched,
      endReached
    }
  } = store.getState();

  if (endReached) return;

  const adsQuery = (numberToFetch, lastKey) => {
    if (lastKey) {
      return dbRef('/ads')
        .orderByKey()
        .limitToFirst(numberToFetch)
        .startAt(lastKey)
        .once('value');
    }
    return dbRef('/ads')
      .orderByKey()
      .limitToFirst(numberToFetch)
      .once('value');
  };

  function handleAds(snapshot, shift) {
    const ads = snapshot;
    const result = Object.keys(ads)
      .map(
        key => {
          const obj = Object.assign({}, ads[key]);
          obj.key = key;
          return obj;
        }
      );

    if (!shift) {
      store.dispatch(fetchAdsSuccess(result));
      store.dispatch(paginationSetPagesFetched(
        Math.ceil(result.length / itemsPerPage))
      );

      if (result.length < itemsPerPage * 5) {
        store.dispatch(paginationSetEndReached(true));
      }
    } else {
      result.shift();
      store.dispatch(fetchAdsSuccess(result));
      debugger;
      store.dispatch(paginationSetPagesFetched(
        pagesFetched + Math.ceil(result.length / itemsPerPage))
      );
      if (result.length < itemsPerPage * pageCountToFetch) { //eslint-disable-line
        store.dispatch(paginationSetEndReached(true));
      }
    }
  }

  // FIRST FETCH
  if (activePage === 1) {
    return adsQuery(itemsPerPage * 5).then(
      snapshot => handleAds(snapshot.val()),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      },
    );
  }

  // NEXT FETCH
  const pageCountToFetch = 4 - (pagesFetched - activePage);
  const {
    ads
  } = store.getState();
  const lastKey = ads[ads.length - 1].key;

  if (pageCountToFetch > 0) {
    debugger;
    return adsQuery((itemsPerPage * pageCountToFetch) + 1, lastKey).then(
      snapshot => handleAds(snapshot.val(), true),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      },
    );
  }
}

export function filterAds(category) {
  const {
    pagination: {
      itemsPerPage,
      activePage,
      pagesFetched,
      endReached
    }
  } = store.getState();

  if (endReached) return;

  const adsQueryCat = (numberToFetch, cat, lastKey) => {
    // NEXT FETCH
    if (lastKey) {
      return dbRef('/ads')
        .orderByChild('category')
        .equalTo(cat)
        .limitToFirst(numberToFetch)
        .startAt(lastKey)
        .once('value');
    }
    // FIRST FETCH
    return dbRef('/ads')
      .orderByChild('category')
      .equalTo(cat)
      .limitToFirst(numberToFetch)
      .once('value');
  };

  function handleAds(snapshot, shift) {
    const ads = snapshot;
    const result = Object.keys(ads)
      .map(
        key => {
          const obj = Object.assign({}, ads[key]);
          obj.key = key;
          return obj;
        }
      );

    if (!shift) {
      store.dispatch(fetchAdsSuccess(result));
      store.dispatch(paginationSetPagesFetched(
        Math.ceil(result.length / itemsPerPage))
      );

      if (result.length < itemsPerPage * 5) {
        store.dispatch(paginationSetEndReached(true));
      }
    } else {
      result.shift();
      store.dispatch(fetchAdsSuccess(result));
      store.dispatch(paginationSetPagesFetched(
        pagesFetched + Math.ceil(result.length / itemsPerPage))
      );
      if (result.length < itemsPerPage * pageCountToFetch) { //eslint-disable-line
        store.dispatch(paginationSetEndReached(true));
      }
    }
  }

  // FIRST FETCH
  if (activePage === 1) {
    return adsQueryCat(itemsPerPage * 5, category).then(
      snapshot => handleAds(snapshot.val()),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      },
    );
  }

  // NEXT FETCH
  const pageCountToFetch = 4 - (pagesFetched - activePage);
  const {
    ads
  } = store.getState();
  const lastKey = ads[ads.length - 1].key;

  if (pageCountToFetch > 0) {
    return adsQueryCat((itemsPerPage * 5) + 1, category, lastKey).then(
      snapshot => handleAds(snapshot.val(), true),
      error => {
        store.dispatch(fetchAdsFailure());
        throw new Error(error);
      },
    );
  }
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
