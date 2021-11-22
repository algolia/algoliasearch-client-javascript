export class Operation {
  /**
   * type of operation
   */
  'action'?: Operation.ActionEnum;
  /**
   * arguments to the operation (depends on the type of the operation)
   */
  'body'?: { [key: string]: object };

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'action',
      baseName: 'action',
      type: 'Operation.ActionEnum',
    },
    {
      name: 'body',
      baseName: 'body',
      type: '{ [key: string]: object; }',
    },
  ];

  static getAttributeTypeMap() {
    return Operation.attributeTypeMap;
  }
}

export namespace Operation {
  export enum ActionEnum {
    AddObject = <any>'addObject',
    UpdateObject = <any>'updateObject',
    PartialUpdateObject = <any>'partialUpdateObject',
    PartialUpdateObjectNoCreate = <any>'partialUpdateObjectNoCreate',
    DeleteObject = <any>'deleteObject',
    Delete = <any>'delete',
    Clear = <any>'clear',
  }
}
