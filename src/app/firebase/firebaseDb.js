import firebaseApp from './firebaseApp'

const db = firebaseApp.database();

const firebaseDb = {
  getDbRef: path => db.ref(path),
}

export default firebaseDb;