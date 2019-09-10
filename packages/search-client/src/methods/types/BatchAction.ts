export const BatchAction: { readonly [key: string]: BatchActionType } = {
  AddObject: 'addObject',
  UpdateObject: 'updateObject',
};

export type BatchActionType = 'addObject' | 'updateObject';
