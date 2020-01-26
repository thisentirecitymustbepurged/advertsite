import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {
  userReadWrite,
  // fetchAllAds
} from './readWrite/reducer';
import pagination from './pagination/reducer';
import filter from './filter/reducer';

import user from './user/reducer';
import ads from './ads/reducer';
import ad from './ad/reducer';


const reducersCombined = combineReducers({
  user,
  userAds: userReadWrite,
  ads,
  ad,
  form,
  pagination,
  filter
});

const store = createStore(
  reducersCombined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
