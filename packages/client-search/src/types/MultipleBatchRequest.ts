import { BatchActionType } from '.';

export type MultipleBatchRequest = {
  readonly indexName: string;
  readonly action: BatchActionType;
  readonly body: object;
};
