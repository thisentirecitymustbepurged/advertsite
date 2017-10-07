/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import coreReducer from './core-reducer';

const appReducer = combineReducers({
  coreReducer
});

export default function rootReducer(state, action) {
  if (action.type === 'RESET_STATE') state = undefined;

  return appReducer(state, action);
}
