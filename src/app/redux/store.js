import { createStore, combineReducers } from 'redux'
import firebaseUserAuthReducer from './firebaseUserAuth/firebaseUserAuthReducer'

const reducersCombined = combineReducers({
  currentFirebaseUser: firebaseUserAuthReducer,
})


const store = createStore(
  reducersCombined, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

