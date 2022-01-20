export type OperationIndexParams = {
  /**
   * Type of operation to perform (move or copy).
   */
  operation: OperationIndexParamsOperation;
  /**
   * The Algolia index name.
   */
  destination: string;
  /**
   * Scope of the data to copy. When absent, a full copy is performed. When present, only the selected scopes are copied.
   */
  scope?: OperationIndexParamsScope[];
};

export type OperationIndexParamsOperation = 'copy' | 'move';

export type OperationIndexParamsScope = 'rules' | 'settings' | 'synonyms';
