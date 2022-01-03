/**
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 */
export type BuildInOperation = {
  /**
   * The operation to apply on the attribute.
   */
  _operation: BuildInOperation.OperationEnum;
  /**
   * The right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.
   */
  value: string;
};

export namespace BuildInOperation {
  export enum OperationEnum {
    Increment = 'Increment',
    Decrement = 'Decrement',
    Add = 'Add',
    Remove = 'Remove',
    AddUnique = 'AddUnique',
    IncrementFrom = 'IncrementFrom',
    IncrementSet = 'IncrementSet',
  }
}
