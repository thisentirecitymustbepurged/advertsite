import { createStore, combineReducers } from 'redux'

import firebaseUserAuthReducer from './firebaseUserAuth/firebaseUserAuthReducer'
import { reducer as formReducer } from 'redux-form'

const reducersCombined = combineReducers({
  currentFirebaseUser: firebaseUserAuthReducer,
  form: formReducer
})

const store = createStore(
  reducersCombined, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

