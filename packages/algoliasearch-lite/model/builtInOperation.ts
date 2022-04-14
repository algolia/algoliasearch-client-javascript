import type { BuiltInOperationType } from './builtInOperationType';

/**
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 */
export type BuiltInOperation = {
  _operation: BuiltInOperationType;
  /**
   * The right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.
   */
  value: string;
};
