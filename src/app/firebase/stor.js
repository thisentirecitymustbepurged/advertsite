import app from './app';

const stor = app.storage();

const firebaseStor = {
  storRef: path => stor.ref(path),
};

export default firebaseStor;
