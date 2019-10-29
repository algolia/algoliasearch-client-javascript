import { BatchActionType } from './BatchActionType';

export type BatchRequest = {
  readonly action: BatchActionType;
  readonly body: object;
};
