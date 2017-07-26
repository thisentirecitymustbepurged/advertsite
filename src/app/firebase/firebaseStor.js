import firebaseApp from './firebaseApp';

const stor = firebaseApp.storage();

const firebaseStor = {
  storRef: path => stor.ref(path),
};

export default firebaseStor;
