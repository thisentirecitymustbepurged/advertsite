import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAdsAttempt: [],
  getAdsSuccess: ['data'],
  getAdsFailure: ['err'],
});
