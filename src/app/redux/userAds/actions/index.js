import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchAdSuccess: ['ad'],
  fetchAdFailure: [],
  checkIfUserIsOwnerSuccess: ['isOwner'],
  checkIfUserIsOwnerFailure: [],

  fetchAdsSuccess: ['ads'],
  fetchAdsFailure: [],
  clearAds: [],

  createUserAdSuccess: [],
  createUserAdFailure: [],
  updateUserAdSuccess: [],
  updateUserAdFailure: [],
  deleteUserAdSuccess: [],
  deleteUserAdFailure: [],
  clearUserAds: []
});
