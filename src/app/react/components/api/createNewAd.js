import firebaseDb from '../../../firebase/firebaseDb';
import firebaseStor from '../../../firebase/firebaseStor';

export default function createNewAd(values, uid) {
  return new Promise ((resolve, reject) => {
    const image = values.image;
    delete values.image;
    const newAdKey = firebaseDb.dbRef('ads').push().key;
    const updates = {};
    updates[`/ads/${newAdKey}`] = { ...values, uid: uid };
    updates[`/user_ads/${uid}/${newAdKey}`] = '';
    firebaseDb.dbRef().update(updates).then(
      () => {
        const newImageKey = firebaseDb.dbRef(`ads/${newAdKey}/images`).push().key;
        const update = {};
        update[`/ads/${newAdKey}/images/${newImageKey}`] = '';
        firebaseDb.dbRef().update(update).then(
          () => {
            firebaseStor.storRef().child(`images/${newImageKey}`).put(image).then(
              snapshot => resolve(snapshot),
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