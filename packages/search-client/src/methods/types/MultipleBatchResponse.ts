export type MultipleBatchResponse = {
  /* eslint-disable functional/prefer-readonly-type */
  objectIDs: string[];
  taskID: { [key: string]: number };
};
