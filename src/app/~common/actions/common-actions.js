import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  uploadAdImageAttempt: [],
  uploadAdImageSuccess: ['data'],
  uploadAdImageFailure: ['err'],
});
