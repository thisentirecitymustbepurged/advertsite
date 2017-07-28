import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  userReadWriteReducer,
  readWriteReducer,
} from './readWrite/reducer';
import userAuthReducer from './userAuth/reducer';

const reducersCombined = combineReducers({
  user: userAuthReducer,
  userAds: userReadWriteReducer,
  ads: readWriteReducer,
  form: formReducer,
});

const store = createStore(
  reducersCombined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
