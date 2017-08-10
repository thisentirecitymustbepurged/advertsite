import firebase from 'firebase';

import app from './app';

const auth = app.auth();

export default {
  loginWithProvider: (providerName) => {
    function getAuthProvider() {
      switch (providerName) {
        case 'facebook':
          return new firebase.auth.FacebookAuthProvider();
        case 'google':
          return new firebase.auth.GoogleAuthProvider();
        case 'twitter':
          return new firebase.auth.TwitterAuthProvider();
          break;
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

  loginWithEmail: (email, password) => auth.signInWithEmailAndPassword(email, password),

  registerWithEmail: (email, password) => auth.createUserWithEmailAndPassword(email, password),

  updateUserProfile: u => auth.currentUser.updateProfile(u).then(
    () => auth.currentUser,
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  resetPasswordEmail: email => auth.sendPasswordResetEmail(email).then(
    () => ({ message: 'Email sent' }),
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  changePassword: newPassword => auth.currentUser.updatePassword(newPassword).then(
    user => user,
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  sendEmailVerification: () => auth.currentUser.sendEmailVerification().then(
    () => ({ message: 'Email sent' }),
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    }))
};
