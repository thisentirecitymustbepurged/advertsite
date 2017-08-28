// import { browserHistory } from 'react-router';
import store from '../redux/store';
import auth from '../firebase/auth';
import db from '../firebase/db';
import stor from '../firebase/stor';
// import {
//   loginUserFailure,
//   loginUserSuccess,

//   // fetchUserSuccess,
//   // fetchUserFailure,

//   logoutUserSuccess,
//   logoutUserFailure,

//   updatePasswordSuccess,
//   updatePasswordFailure,
// } from '../redux/userAuth/actionCreators';
import {
  createUserAdSuccess,
  createUserAdFailure,

  fetchUserAdsSuccess,
  fetchUserAdsFailure,

  updateUserAdSuccess,
  updateUserAdFailure,

  deleteUserAdSuccess,
  deleteUserAdFailure,

  fetchAdsSuccess,
  fetchAdsFailure,

  // fetchAdSuccess,
  // fetchAdFailure,
  // userIsOwner,

  clearUserAds,
  clearAds
} from '../redux/readWrite/actionCreators';
import { Creators as userActions } from '../redux/user/actions';
import { Creators as adActions } from '../redux/ad/actions';
import { Creators as paginationActions } from '../redux/pagination/actions';


const {
  fetchUserAttempt,
  fetchUserSuccess,
  fetchUserFailure,
  loginUserAttempt,
  loginUserSuccess,
  loginUserFailure,
  logoutUserAttempt,
  logoutUserSuccess,
  logoutUserFailure,
  updatePasswordAttempt,
  updatePasswordSuccess,
  updatePasswordFailure,
  registerAttempt,
  registerSuccess,
  registerFailure,
} = userActions;

const {
  fetchAdAttempt,
  fetchAdSuccess,
  fetchAdFailure,
  checkIfUserIsOwnerAttempt,
  checkIfUserIsOwnerSuccess,
  checkIfUserIsOwnerFailure
} = adActions;

const {
  paginationSetPagesFetched,
  paginationSetEndReached,
  paginationSetAdsCount
} = paginationActions;

const { dbRef } = db;
const { storRef } = stor;

// userAuth
export function updatePassword(newPassword) {
  store.dispatch(updatePasswordAttempt());
  auth.updatePassword(newPassword).then(
    () => store.dispatch(updatePasswordSuccess()),
    err => {
      store.dispatch(updatePasswordFailure(err));
      throw new Error(err);
    }
  );
}

export function loginWithEmail({ email, password }) {
  store.dispatch(loginUserAttempt());
  auth.loginWithEmail(email, password).then(
    ({ displayName, uid }) =>
      store.dispatch(loginUserSuccess({ email, displayName, uid })),
    err => {
      store.dispatch(loginUserFailure(err));
      throw new Error(err);
    },
  );
}

export function registerWithEmail({ email, password }) {
  store.dispatch(registerAttempt());
  auth.registerWithEmail(email, password).then(
    ({ displayName, uid }) => {
      store.dispatch(registerSuccess({ email, displayName, uid }));
    },
    err => {
      store.dispatch(registerFailure(err));
      throw new Error(err);
    },
  );
}

export function loginWithProvider(provider) {
  store.dispatch(loginUserAttempt());
  auth.loginWithProvider(provider).then(
    ({ user: { email, displayName, uid } }) =>
      store.dispatch(loginUserSuccess({ email, displayName, uid })),
    err => {
      store.dispatch(loginUserFailure(err));
      throw new Error(err);
    },
  );
}

export function fetchUser() {
  store.dispatch(fetchUserAttempt());
  auth.onAuthStateChanged().then(
    data => {
      // eslint-disable-next-line
      data
        ? store.dispatch(fetchUserSuccess({
          uid: data.uid,
          email: data.email,
          displayName: data.displayName
        }))
        : store.dispatch(fetchUserSuccess(null));
    },
    err => {
      store.dispatch(fetchUserFailure(err));
      throw new Error(err);
    },
  );
}

export function logOut() {
  store.dispatch(logoutUserAttempt());
  auth.logoutUser().then(
    () => {
      store.dispatch(logoutUserSuccess());
      store.dispatch(clearUserAds());
    },
    err => {
      store.dispatch(logoutUserFailure(err));
      throw new Error(err);
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
              err => reject(err),
            );
          },
          err => reject(err),
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
        err => {
          store.dispatch(createUserAdFailure(err));
          throw new Error(err);
        },
      );
    },
    err => {
      store.dispatch(createUserAdFailure(err));
      throw new Error(err);
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
        throw new Error(`Something's wrong with the query order object: ${order}`);
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
      endReached,
      adsCount
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
      err => {
        store.dispatch(fetchAdsFailure(err));
        throw new Error(err);
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
      err => {
        store.dispatch(fetchAdsFailure(err));
        throw new Error(err);
      }
    );
  }

  function handleAds(fetchedAds, numberToFetch, isInitial) {
    if (filterExists) {
      store.dispatch(clearAds());
    }
    const result = Object.keys(fetchedAds).map(key => {
      const obj = Object.assign({}, fetchedAds[key]);
      obj.key = key;
      return obj;
    });

    if (isInitial) {
      if (result.length < numberToFetch) {
        store.dispatch(paginationSetEndReached(true));
      }
      store.dispatch(fetchAdsSuccess(result));
      store.dispatch(paginationSetAdsCount(result.length));
      store.dispatch(paginationSetPagesFetched(
        Math.ceil(result.length / itemsPerPage)
      ));
    } else {
      if (result.length < numberToFetch) {
        store.dispatch(paginationSetEndReached(true));
      }
      result.shift();
      store.dispatch(fetchAdsSuccess(result));
      store.dispatch(paginationSetAdsCount(adsCount + result.length));
      store.dispatch(paginationSetPagesFetched(
        Math.ceil((adsCount + result.length) / itemsPerPage)
      ));
    }
  }
}

export function fetchAd(adKey, uid) {
  store.dispatch(fetchAdAttempt());
  dbRef(`ads/${adKey}`).once('value').then(
    snapshot => {
      store.dispatch(fetchAdSuccess(snapshot.val()));
      store.dispatch(checkIfUserIsOwnerAttempt(true));
      //eslint-disable-next-line
      uid && dbRef(`user_ads/${uid}/${adKey}`).once('value').then(
        () => {
          store.dispatch(checkIfUserIsOwnerSuccess(true, false));
        },
        err => {
          store.dispatch(checkIfUserIsOwnerFailure(err, false));
        }
      );
    },
    err => {
      store.dispatch(fetchAdFailure(err, false));
      throw new Error(err);
    },
  );
}

export function updateAd(values, uid, adKey) {
  const {
    ad
  } = store.getState();
  const updates = { ...ad, ...values };
  const promiseList = Object.keys(updates).map(prop => {
    const update = {};
    update[`/user_ads/${uid}/${adKey}/${prop}`] = updates[prop];
    update[`/ads/${adKey}/${prop}`] = updates[prop];
    const promise = new Promise((resolve, reject) => {
      dbRef().update(update).then(
        () => resolve(),
        err => reject(err)
      );
    });
    return promise;
  });

  Promise.all(promiseList).then(
    () => {
      store.dispatch(updateUserAdSuccess());
      fetchAd(adKey, uid);
    },
    err => {
      store.dispatch(updateUserAdFailure(err));
      throw new Error(err);
    },
  );
}

export function userAdsListener(uid) {
  const userAdsRef = dbRef(`/user_ads/${uid}`);
  userAdsRef.on('value',
    snapshot => store.dispatch(fetchUserAdsSuccess(snapshot.val())),
    err => {
      store.dispatch(fetchUserAdsFailure(err));
      throw new Error(err);
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
    err => {
      store.dispatch(deleteUserAdFailure(err));
      throw new Error(err);
    },
  );
}
