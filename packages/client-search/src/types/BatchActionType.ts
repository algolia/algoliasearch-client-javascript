export const BatchActionEnum: Readonly<Record<string, BatchActionType>> = {
  AddObject: 'addObject',
  UpdateObject: 'updateObject',
  PartialUpdateObject: 'partialUpdateObject',
  PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
  DeleteObject: 'deleteObject',
};

export type BatchActionType =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject';
