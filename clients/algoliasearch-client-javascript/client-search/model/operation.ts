export type Operation = {
  /**
   * Type of operation.
   */
  action?: Operation.ActionEnum;
  /**
   * Arguments to the operation (depends on the type of the operation).
   */
  body?: { [key: string]: Record<string, any> };
};

export namespace Operation {
  export enum ActionEnum {
    AddObject = 'addObject',
    UpdateObject = 'updateObject',
    PartialUpdateObject = 'partialUpdateObject',
    PartialUpdateObjectNoCreate = 'partialUpdateObjectNoCreate',
    DeleteObject = 'deleteObject',
    Delete = 'delete',
    Clear = 'clear',
  }
}
