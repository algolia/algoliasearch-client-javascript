/**
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 */
export type BuildInOperation = {
  /**
   * The operation to apply on the attribute.
   */
  _operation: BuildInOperationOperation;
  /**
   * The right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.
   */
  value: string;
};

export type BuildInOperationOperation =
  | 'Add'
  | 'AddUnique'
  | 'Decrement'
  | 'Increment'
  | 'IncrementFrom'
  | 'IncrementSet'
  | 'Remove';
