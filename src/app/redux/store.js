import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  userReadWrite,
  fetchAllAds,
  fetchAd,
} from './readWrite/reducer';
import userAuth from './userAuth/reducer';

const reducersCombined = combineReducers({
  user: userAuth,
  userAds: userReadWrite,
  ads: fetchAllAds,
  ad: fetchAd,
  form: formReducer,
});

const store = createStore(
  reducersCombined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
