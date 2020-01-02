import { BatchActionType } from '.';

export type MultipleBatchRequest = {
  /**
   * The index name where the multiple batch are going to be applied.
   */
  readonly indexName: string;

  /**
   * The action used.
   */
  readonly action: BatchActionType;

  /**
   * The body associated with the request.
   */
  readonly body: Record<string, any>;
};
