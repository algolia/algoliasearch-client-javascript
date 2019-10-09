type ClickedObjectIDsAfterSearchEvent = {
  /* eslint-disable functional/prefer-readonly-type */
  eventName: string;
  indexName: string;
  objectIDs?: string[];
  positions?: number[];
  queryID?: string;
};
