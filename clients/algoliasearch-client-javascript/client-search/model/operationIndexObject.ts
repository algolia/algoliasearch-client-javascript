export type OperationIndexObject = {
  /**
   * Type of operation to perform (move or copy).
   */
  operation: OperationIndexObjectOperation;
  /**
   * The Algolia index name.
   */
  destination: string;
  /**
   * Scope of the data to copy. When absent, a full copy is performed. When present, only the selected scopes are copied.
   */
  scope?: OperationIndexObjectScope[];
};

export type OperationIndexObjectOperation = 'copy' | 'move';

export type OperationIndexObjectScope = 'rules' | 'settings' | 'synonyms';
