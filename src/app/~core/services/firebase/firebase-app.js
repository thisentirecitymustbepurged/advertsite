import firebase from 'firebase';
import config from './firebase-config';

const app = firebase.initializeApp(config);

export default app;
