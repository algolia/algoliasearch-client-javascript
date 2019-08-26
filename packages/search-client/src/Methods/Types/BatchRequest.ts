import { BatchAction } from './BatchAction';

export type BatchRequest = {
  readonly action: BatchAction;
  readonly body: object;
};
