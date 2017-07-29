import db from '../../firebase/db';
import stor from '../../firebase/stor';

const { dbRef } = db;
const { storRef } = stor;

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
        const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key
        storRef(`/images/${newImageKey}`).put(image).then(
          snapshot => {
            const path = `/ads/${newAdKey}/images/${newImageKey}`;
            dbRef(path).set(snapshot.downloadURL).then(
              () => resolve(),
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
