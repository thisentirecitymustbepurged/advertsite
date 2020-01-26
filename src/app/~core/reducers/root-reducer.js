/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducers as home } from 'app/home';
import core from './core-reducer';

const appReducer = combineReducers({
  core,
  home,
  form
});

export default function rootReducer(state, action) {
  if (action.type === 'RESET_STATE') state = undefined;

  return appReducer(state, action);
}
