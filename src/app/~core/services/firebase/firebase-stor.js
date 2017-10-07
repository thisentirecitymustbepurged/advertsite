import app from './firebase-app';

const stor = app.storage();

export default {
  storRef: path => stor.ref(path),
};
