import firebase from 'firebase';
import { constants } from 'app/~core/config';
import app from './firebase-app';

const auth = app.auth();
const {
  FACEBOOK,
  GOOGLE,
  TWITTER,
  GITHUB
} = constants.OAuth;

export default {
  loginWithOAuth: (oauthProviderName) => {
    const getOAuthProvider = () => {
      switch (oauthProviderName) {
        case FACEBOOK:
          return new firebase.auth.FacebookAuthProvider();
        case GOOGLE:
          return new firebase.auth.GoogleAuthProvider();
        case TWITTER:
          return new firebase.auth.TwitterAuthProvider();
        case GITHUB:
          return new firebase.auth.GithubAuthProvider();
        default:
          throw new Error('Provider is not supported.');
      }
    };
    return auth.signInWithPopup(getOAuthProvider());
  },

  logout: () => auth.signOut(),

  onAuthStateChanged: () => new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      user => resolve(user),
      error => reject(error)
    );
  }),

  loginWithEmail: (email, password) => auth.signInWithEmailAndPassword(email, password),

  registerWithEmail: (email, password) => auth.createUserWithEmailAndPassword(email, password),

  updatePassword: newPassword => auth.currentUser.updatePassword(newPassword),

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

  sendEmailVerification: () => auth.currentUser.sendEmailVerification().then(
    () => ({ message: 'Email sent' }),
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    }))
};
