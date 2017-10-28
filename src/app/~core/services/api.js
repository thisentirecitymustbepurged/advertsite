import {
  firebaseAuth,
  firebaseDb,
  firebaseStor
} from './firebase';
import { constants } from '../config';

const {
  loginWithOAuth,
  loginWithEmail,
  logout,
  registerWithEmail,
  updatePassword,
  onAuthStateChanged
} = firebaseAuth;
const { get, post, update, del } = firebaseDb;
const { uploadFile, deleteFile } = firebaseStor;
const { ADS, USER_ADS } = constants.DatabaseRefMap;

export default {
  // core
  loginWithOAuth: oauthProviderName => loginWithOAuth(oauthProviderName),
  loginWithEmail: (email, password) => loginWithEmail(email, password),
  logout: () => logout(),
  registerWithEmail: (email, password) => registerWithEmail(email, password),
  fetchUser: () => onAuthStateChanged(),
  newAd: data => post(ADS, data),
  saveAdToUserAdList: (uid, key) => post(USER_ADS + uid + key),

  // ad
  getAd: key => get(ADS + key),
  checkIfUserIsOwner: (uid, key) => get(USER_ADS + uid + key),
  updateAd: (key, data) => update(ADS + key, data),
  deleteAdImage: imageName => deleteFile(imageName),

  // commmon
  uploadAdImage: (image, imageName) => uploadFile(image, imageName),

  // home
  getAds: params => get(ADS, {}),

  // userprofile
  getUserAds: uid => get(USER_ADS + uid),
  deleteAd: key => del(ADS + key),
  deleteAdFromUserAdList: (uid, key) => del(USER_ADS + uid + key),
  updatePassword: newPassword => updatePassword(newPassword),
};
