import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchAdsAttempt: [],
  fetchAdsSuccess: ['data'],
  fetchAdsFailure: ['err'],

  fetchUserAdsAttempt: [],
  fetchUserAdsSuccess: ['data'],
  fetchUserAdsFailure: ['err'],

  clearAds: [],
  clearUserAds: []
});
