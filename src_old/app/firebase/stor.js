import app from './app';

const stor = app.storage();

export default {
  storRef: path => stor.ref(path),
};
