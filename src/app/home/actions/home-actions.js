import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAdsAttempt: [],
  getAdsSuccess: ['ads'],
  getAdsFailure: ['err'],
});
