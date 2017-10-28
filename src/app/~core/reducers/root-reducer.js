/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { reducers as homeReducer } from 'app/home';
import coreReducer from './core-reducer';

const appReducer = combineReducers({
  core: coreReducer,
  home: homeReducer
});

export default function rootReducer(state, action) {
  if (action.type === 'RESET_STATE') state = undefined;

  return appReducer(state, action);
}
