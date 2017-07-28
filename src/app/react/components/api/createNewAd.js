import firebaseDb from '../../../firebase/firebaseDb';
import firebaseStor from '../../../firebase/firebaseStor';

export default function createNewAd(values, uid) {
  return new Promise ((resolve, reject) => {
    const image = values.image;
    delete values.image;
    const newItemKey = firebaseDb.dbRef('ads').push().key;
    const updates = {};
    updates[`/ads/${newItemKey}`] = { ...values, uid: uid };
    updates[`/user_ads/${uid}/${newItemKey}`] = '';
    firebaseDb.dbRef().update(updates).then(
      () => {
        const newImageKey = firebaseDb.dbRef(`ads/${newItemKey}/images`).push().key;
        const update = {};
        update[`/ads/${newItemKey}/images/${newImageKey}`] = '';
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