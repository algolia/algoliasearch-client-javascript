import { BatchActionType } from '.';

export type BatchRequest = {
  readonly action: BatchActionType;
  readonly body: object;
};
