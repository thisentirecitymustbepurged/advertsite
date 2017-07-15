import firebase from 'firebase'
import { FIREBASE_CONFIG } from './config'

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

export default firebaseApp;