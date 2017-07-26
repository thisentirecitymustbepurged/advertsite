import firebase from 'firebase';

import firebaseApp from './firebaseApp';

const auth = firebaseApp.auth();

const firebaseAuth = {
  getProvider: (providerName) => {
    switch (providerName) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
        break;
      default:
        throw new Error('Provider is not supported.');
    }
  },

  loginWithProvider(providerName) {
    const provider = this.getProvider(providerName);
    return auth.signInWithPopup(provider);
  },

  logoutUser: () => auth.signOut(),

  fetchUser: () => new Promise((resolve, reject) => {
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

export default firebaseAuth;
