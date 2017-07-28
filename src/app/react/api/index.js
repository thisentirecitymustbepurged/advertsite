import db from '../../firebase/db';
import stor from '../../firebase/stor';

const { dbRef } = db;

console.log(dbRef);

export function createNewAd(values, uid) {
  return new Promise ((resolve, reject) => {
    const image = values.image;
    delete values.image;
    const newAdKey = dbRef('ads').push().key;
    const updates = {};
    updates[`/ads/${newAdKey}`] = { ...values, uid: uid };
    updates[`/user_ads/${uid}/${newAdKey}`] = '';
    dbRef().update(updates).then(
      () => {
        stor.storRef().child(`images/${newImageKey}`).put(image).then(
          () => {
            const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key;
            const path = `/ads/${newAdKey}/images/${newImageKey}`;
            const url = snapshot.downloadURL;
            dbRef(path).set().then(
              snapshot => resolve(),
              error => reject(),
            );
          },
          error => reject(),
        );
      },
      error => reject(),
    )
  });
}
