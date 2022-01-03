/**
 * Type of operation.
 */
export enum Action {
  AddObject = 'addObject',
  UpdateObject = 'updateObject',
  PartialUpdateObject = 'partialUpdateObject',
  PartialUpdateObjectNoCreate = 'partialUpdateObjectNoCreate',
  DeleteObject = 'deleteObject',
  Delete = 'delete',
  Clear = 'clear',
}
