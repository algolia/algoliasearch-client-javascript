export type MultipleBatchResponse = {
  readonly objectIDs: readonly string[];
  readonly taskID: { readonly [key: string]: number };
};
