export type Operation = {
  /**
   * type of operation
   */
  action?: Operation.ActionEnum;
  /**
   * arguments to the operation (depends on the type of the operation)
   */
  body?: { [key: string]: object };
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
