const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Yours First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// firebase deploy --only functions

// exports.adCount = functions.database.ref('/ads').onWrite(event => {
//   const snapshot = event.data;
//   const update = {};
//   update['/ads_count'] = snapshot.numChildren();
//   return admin.database().ref().update(update);
// });

exports.adCount = functions.database.ref('/ads/{adKey}').onWrite(event => {
  const snapshot = event.data;
  // const ref = snapshot.adminRef();
  // const ref = event.adminRef();
  const ref = snapshot.adminRef;
  const update = {};
  update['/ads_count'] = ref.parent.numChildren();
  return admin.database().ref().update(update);
});
