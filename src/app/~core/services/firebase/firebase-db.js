import app from './firebase-app';
import { constants } from 'app/~core/config';

const { KEY, CHILD, VALUE } = constants.OrderBy;

const db = app.database();

const ref = path => db.ref(path);

export default {
  get: (path, {
    order,
    equalTo,
    limitToFirst,
    limitToLast,
    startAt,
    endAt
  }) => {
    let query = ref(path);
    if (typeof order !== 'undefined') {
      switch (order) {
        case KEY: query = query.orderByKey(); break;
        case CHILD: query = query.orderByChild(); break;
        case VALUE: query = query.orderByValue(); break;
        default: throw new Error(`Something's wrong with the query order value: ${order}`);
      }
      if (equalTo) {
        query = query.equalTo(equalTo);
      }
      if (limitToFirst) {
        query = query.limitToFirst(limitToFirst);
      }
      if (limitToLast) {
        query = query.limitToLast(limitToLast);
      }
      if (startAt) {
        query = query.startAt(startAt);
      }
      if (endAt) {
        query = query.endAt(endAt);
      }
    }
    return query.once('value');
  }
};
