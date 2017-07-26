import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  userReadWriteReducer,
  readWriteReducer,
} from './readWrite/readWriteReducer';
import userAuthReducer from './userAuth/userAuthReducer';

const reducersCombined = combineReducers({
  items: readWriteReducer,
  user: userAuthReducer,
  userItems: userReadWriteReducer,
  form: formReducer,
});

const store = createStore(
  reducersCombined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
