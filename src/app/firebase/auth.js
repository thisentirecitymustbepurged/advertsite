import firebase from 'firebase';

import app from './app';

const auth = app.auth();

export default {
  loginWithProvider: (providerName) => {
    function getAuthProvider() {
      switch (providerName) {
        case 'facebook':
          return new firebase.auth.FacebookAuthProvider();
        default:
          throw new Error('Provider is not supported.');
      }
    }
    return auth.signInWithPopup(getAuthProvider());
  },

  logoutUser: () => auth.signOut(),

  onAuthStateChanged: () => new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      (user) => {
        resolve(user);
      },
      (error) => {
        reject(error);
      },
    );
  }),
};
