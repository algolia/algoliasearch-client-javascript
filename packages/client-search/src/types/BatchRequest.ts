import { BatchActionType } from '.';

export type BatchRequest = {
  /**
   * The batch action.
   */
  readonly action: BatchActionType;

  /**
   * The body of the given `action`. Note that, bodies difer
   * depending of the action.
   */
  readonly body: Record<string, any>;
};
