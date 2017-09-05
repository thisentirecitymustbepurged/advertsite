import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  paginationSetItemsPerPage: ['itemsPerPage'],
  paginationSetActivePage: ['activePage'],
  paginationSetPagesFetched: ['pagesFetched'],
  paginationSetEndReached: ['endReached'],
  paginationSetAdsCount: ['adsCount']
});
