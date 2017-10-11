import {
  firebaseAuth,
  firebaseDb,
  firebaseStor
} from './firebase';
import DatabaseRefMap from '../config';

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
const { ADS, USER_ADS } = DatabaseRefMap;

export default {
  loginWithOAuth: oauthProviderName => loginWithOAuth(oauthProviderName),
  loginWithEmail: (email, password) => loginWithEmail(email, password),
  logout: () => logout(),
  registerWithEmail: (email, password) => registerWithEmail(email, password),
  updatePassword: newPassword => updatePassword(newPassword),
  fetchUser: () => onAuthStateChanged(),

  newAd: data => post(ADS, data),
  getAd: key => get(ADS + key),
  getAds: params => get(ADS, params),
  updateAd: (key, data) => update(ADS + key, data),
  deleteAd: key => del(ADS + key),
  uploadAdImage: (image, imageName) => uploadFile(image, imageName),
  deleteAdImage: imageName => deleteFile(imageName),
  saveAdToUserAdList: (uid, key) => post(USER_ADS + uid + key),
  deleteAdFromUserAdList: (uid, key) => del(USER_ADS + uid + key),
  getUserAds: uid => get(USER_ADS + uid)
};
