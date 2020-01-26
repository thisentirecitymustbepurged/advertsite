import firebase from 'firebase';
import { FIREBASE_CONFIG } from './config';

const app = firebase.initializeApp(FIREBASE_CONFIG);

export default app;
