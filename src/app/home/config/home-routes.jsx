import React from 'react';
import { IndexRoute } from 'react-router';
import store from 'app/~core/config/store';
import Home from 'app/home/containers';
import { Creators as homeActions } from '../actions';

const { getAdsAttempt } = homeActions;
const getAds = store.dispatch.bind(null, getAdsAttempt());

export default (
  <IndexRoute onEnter={getAds} component={Home} />
);
