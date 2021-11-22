export class SaveObjectResponse {
  'createdAt'?: string;
  /**
   * taskID of the indexing task to wait for.
   */
  'taskID'?: number;
  /**
   * Unique identifier of the object
   */
  'objectID'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'createdAt',
      baseName: 'createdAt',
      type: 'string',
    },
    {
      name: 'taskID',
      baseName: 'taskID',
      type: 'number',
    },
    {
      name: 'objectID',
      baseName: 'objectID',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return SaveObjectResponse.attributeTypeMap;
  }
}
