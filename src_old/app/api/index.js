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

  // fetchAdsSuccess,
  // fetchAdsFailure,

  // fetchAdSuccess,
  // fetchAdFailure,
  // userIsOwner,

  clearUserAds,
  clearAds
} from '../redux/readWrite/actionCreators';
import { Creators as userActions } from '../redux/user/actions';
import { Creators as adActions } from '../redux/ad/actions';
import { Creators as adsActions } from '../redux/ads/actions';
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
  fetchAdsAttempt,
  fetchAdsSuccess,
  fetchAdsFailure,
  setThereWasInitialFetch
} = adsActions;
const {
  paginationSetPagesFetched,
  paginationSetEndReached,
  paginationSetAdsCount
} = paginationActions;

const { dbRef } = db;
const { storRef } = stor;

const dispatch = func => {
  store.dispatch(func);
};

// userAuth
export function updatePassword(newPassword) {
  dispatch(updatePasswordAttempt());
  auth.updatePassword(newPassword).then(
    () => dispatch(updatePasswordSuccess()),
    err => {
      dispatch(updatePasswordFailure(err));
      throw new Error(err);
    }
  );
}

export function loginWithEmail({ email, password }) {
  dispatch(loginUserAttempt());
  auth.loginWithEmail(email, password).then(
    ({ displayName, uid }) =>
      dispatch(loginUserSuccess({ email, displayName, uid })),
    err => {
      dispatch(loginUserFailure(err));
      throw new Error(err);
    },
  );
}

export function registerWithEmail({ email, password }) {
  dispatch(registerAttempt());
  auth.registerWithEmail(email, password).then(
    ({ displayName, uid }) => {
      dispatch(registerSuccess({ email, displayName, uid }));
    },
    err => {
      dispatch(registerFailure(err));
      throw new Error(err);
    },
  );
}

export function loginWithProvider(provider) {
  dispatch(loginUserAttempt());
  auth.loginWithProvider(provider).then(
    ({ user: { email, displayName, uid } }) =>
      dispatch(loginUserSuccess({ email, displayName, uid })),
    err => {
      dispatch(loginUserFailure(err));
      throw new Error(err);
    },
  );
}

export function fetchUser() {
  dispatch(fetchUserAttempt());
  auth.onAuthStateChanged().then(
    // eslint-disable-next-line
    data => data
      ? dispatch(fetchUserSuccess({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName
      }))
      : dispatch(fetchUserSuccess(null)),
    err => {
      dispatch(fetchUserFailure(err));
      throw new Error(err);
    },
  );
}

export function logOut() {
  dispatch(logoutUserAttempt());
  auth.logoutUser().then(
    () => {
      dispatch(logoutUserSuccess());
      dispatch(clearUserAds());
    },
    err => {
      dispatch(logoutUserFailure(err));
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
    ads,
    ads: {
      thereWasInitialFetch
    }
  } = store.getState();
  const filterExists = Object.keys(filter).length;

  if (endReached) return;

  // INITIAL CALL
  if (!thereWasInitialFetch) {
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
    dispatch(fetchAdsAttempt());
    return query('/ads', f()).then(
      snapshot => handleAds(snapshot.val(), numberToFetch, !thereWasInitialFetch),
      err => {
        dispatch(fetchAdsFailure(err));
        throw new Error(err);
      }
    );
  }

  // NEXT CALL
  if (pagesFetched) {
    const lastKey = ads.data[ads.data.length - 1].key;
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
    dispatch(fetchAdsAttempt());
    return query('/ads', f()).then(
      snapshot => handleAds(snapshot.val(), numberToFetch),
      err => {
        dispatch(fetchAdsFailure(err));
        throw new Error(err);
      }
    );
  }

  function handleAds(fetchedAds, numberToFetch, isInitial) {
    if (filterExists) {
      dispatch(clearAds());
    }
    if (isInitial) {
      dispatch(setThereWasInitialFetch(true));
    }
    const result = Object.keys(fetchedAds).map(key => {
      const obj = Object.assign({}, fetchedAds[key]);
      obj.key = key;
      return obj;
    });

    if (isInitial) {
      if (result.length < numberToFetch) {
        dispatch(paginationSetEndReached(true));
      }
      dispatch(fetchAdsSuccess(result));
      dispatch(paginationSetAdsCount(result.length));
      dispatch(paginationSetPagesFetched(
        Math.ceil(result.length / itemsPerPage)
      ));
    } else {
      if (result.length < numberToFetch) {
        dispatch(paginationSetEndReached(true));
      }
      result.shift();
      dispatch(fetchAdsSuccess(result));
      dispatch(paginationSetAdsCount(adsCount + result.length));
      dispatch(paginationSetPagesFetched(
        Math.ceil((adsCount + result.length) / itemsPerPage)
      ));
    }
  }
}

export function fetchAd(adKey, uid) {
  dispatch(fetchAdAttempt());
  dbRef(`ads/${adKey}`).once('value').then(
    adSnapshot => {
      dispatch(fetchAdSuccess(adSnapshot.val()));
      dispatch(checkIfUserIsOwnerAttempt());
      uid && dbRef(`user_ads/${uid}/${adKey}`).once('value').then(
        isOwnerSnapshot => {
          if (isOwnerSnapshot.val()) return dispatch(checkIfUserIsOwnerSuccess(true));
          return dispatch(checkIfUserIsOwnerSuccess(false));
        },
        err => {
          dispatch(checkIfUserIsOwnerFailure(err));
          throw new Error(err);
        }
      );
    },
    err => {
      dispatch(fetchAdFailure(err, false));
      throw new Error(err);
    },
  );
}

const imageUpload = (image, resolve, reject, adKey, uid) => {
  const imageKey = dbRef(`ads/${adKey}/images`).push().key;
  storRef(`/images/${imageKey}`).put(image).then(
    snapshot => {
      const pathAds = `/ads/${adKey}/images/${imageKey}`;
      const pathUserAds = `/user_ads/${uid}/${adKey}/images/${imageKey}`;
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

export function createNewAd(values, uid) {
  const {
    images,
    ...updates
  } = values;

  const adKey = dbRef('ads').push().key;
  const ad = {};
  ad[`/ads/${adKey}`] = updates;
  ad[`/user_ads/${uid}/${adKey}`] = updates;
  dbRef().update(ad).then(
    () => {
      const promiseList = Object.keys(images).map(key => {
        const image = images[key];
        const promise = new Promise((resolve, reject) => {
          imageUpload(image, resolve, reject, adKey, uid);
        });
        return promise;
      });

      Promise.all(promiseList).then(
        () => dispatch(createUserAdSuccess()),
        err => {
          dispatch(createUserAdFailure(err));
          throw new Error(err);
        },
      );
    },
    err => {
      dispatch(createUserAdFailure(err));
      throw new Error(err);
    },
  );
}

export function updateAd(values, uid, adKey) {
  const {
    images,
    ...updates
  } = values;

  let promiseList = Object.keys(updates).map(prop => {
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

  promiseList = promiseList.concat(Object.keys(images).map(key => {
    const image = images[key];
    const promise = new Promise((resolve, reject) => {
      imageUpload(image, resolve, reject, adKey, uid);
    });
    return promise;
  }));

  Promise.all(promiseList).then(
    () => {
      dispatch(updateUserAdSuccess());
      fetchAd(adKey, uid);
    },
    err => {
      dispatch(updateUserAdFailure(err));
      throw new Error(err);
    },
  );
}

export function userAdsListener(uid) {
  const userAdsRef = dbRef(`/user_ads/${uid}`);
  userAdsRef.on('value',
    snapshot => dispatch(fetchUserAdsSuccess(snapshot.val())),
    err => {
      dispatch(fetchUserAdsFailure(err));
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
    () => dispatch(deleteUserAdSuccess()),
    err => {
      dispatch(deleteUserAdFailure(err));
      throw new Error(err);
    },
  );
}
