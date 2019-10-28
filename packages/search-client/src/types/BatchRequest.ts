import { BatchActionType } from './BatchAction';

export type BatchRequest = {
  readonly action: BatchActionType;
  readonly body: object;
};
