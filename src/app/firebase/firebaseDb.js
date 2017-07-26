import firebaseApp from './firebaseApp';

const db = firebaseApp.database();

const firebaseDb = {
  dbRef: path => db.ref(path),
};

export default firebaseDb;
