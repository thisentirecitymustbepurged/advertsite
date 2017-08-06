// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);

// // // Create and Deploy Yousdsrs First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// // firebase deploy --only functions

// // exports.adCount = functions.database.ref('/ads').onWrite(event => {
// //   const snapshot = event.data;
// //   const update = {};
// //   update['/ads_count'] = snapshot.numChildren();
// //   return admin.database().ref().update(update);
// // });

// // ####NOT WORKING
// // exports.adCount = functions.database.ref('/ads/{adKey}').onWrite(event => {
// //   // const snapshot = ;
// //   // const ref = snapshot.ref;
// //   const num = event.data.ref.parent;
// //   functions.database.ref

// //   // const ref = snapshot.adminRef();
// //   // const ref = event.adminRef();
// //   console.log('lalalal' + num)
// //   const update = {};
// //   update['/ads_count'] = num;
// //   return admin.database().ref().update(update);
// // });

// exports.adCount = functions.database.ref('/ads/{adKey}').onWrite(event => {
//   const snapshot = event.data;
//   const update = {};
//   return new Promise((resolve, reject) => {
//     admin.database().ref('/ads_count').once('value').then(
//       adCount => {
//         update['/ads_count'] = adCount + 1;
//         return admin.database().ref().update(update);
//       }
//     );
//   })

//   // update['/ads_count'] = num;
//   // console.log(JSON.stringify(event.data));
//   // console.log(JSON.stringify(event.data.ref));
//   // admin.database().ref('ads_count').
// });
