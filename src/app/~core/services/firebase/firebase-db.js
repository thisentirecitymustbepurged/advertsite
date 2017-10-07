import app from './firebase-app';

const db = app.database();

export default {
  dbRef: path => db.ref(path),
};
