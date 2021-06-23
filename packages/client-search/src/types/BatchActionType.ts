export const BatchActionEnum: Readonly<Record<string, BatchActionType>> = {
  AddObject: 'addObject',
  UpdateObject: 'updateObject',
  PartialUpdateObject: 'partialUpdateObject',
  PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
  DeleteObject: 'deleteObject',
  DeleteIndex: 'delete',
  ClearIndex: 'clear',
};

export type BatchActionType =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';
