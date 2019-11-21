import {
  assignUserID,
  assignUserIDs,
  getUserID,
  listUserIDs,
  removeUserID,
  searchUserIDs,
  topUserIDs,
} from '@algolia/client-search';

import { methods as browserMethods } from './browser';

export const methods = {
  searchClient: {
    ...browserMethods.searchClient,
    ...{
      assignUserID,
      assignUserIDs,
      getUserID,
      searchUserIDs,
      listUserIDs,
      topUserIDs,
      removeUserID,
    },
  },
  searchIndex: browserMethods.searchIndex,
  analyticsClient: browserMethods.analyticsClient,
};
