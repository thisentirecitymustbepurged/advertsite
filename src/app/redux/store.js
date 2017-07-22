import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  firebaseUserReadWriteReducer,
  firebaseReadWriteReducer
} from './firebaseReadWrite/firebaseReadWriteReducer'
import firebaseUserAuthReducer from './firebaseUserAuth/firebaseUserAuthReducer'

const reducersCombined = combineReducers({
  firebaseItems: firebaseReadWriteReducer,
  firebaseUser: firebaseUserAuthReducer,
  firebaseUserItems: firebaseUserReadWriteReducer,
  form: formReducer,
})

const store = createStore(
  reducersCombined, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

