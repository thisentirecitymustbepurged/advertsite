import firebase from 'firebase';
import { FIREBASE_CONFIG } from './config';

const app = firebase.initializeApp(FIREBASE_CONFIG);
const auth = app.auth();
const db = app.database();

const Firebase = {
  getProvider: (providerName) => {
    switch (providerName) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
        break;
      default:
        throw new Error('Provider is not supported.');
    }
  },

  loginWithProvider: function (providerName) {    
    const provider = this.getProvider(providerName);
    return auth.signInWithPopup(provider).then(
      auth.currentUser
    ).catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    }))  
  },

};

export default Firebase;