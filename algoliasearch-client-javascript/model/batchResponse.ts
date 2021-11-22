export class BatchResponse {
  /**
   * taskID of the indexing task to wait for.
   */
  'taskID'?: number;
  /**
   * List of objectID
   */
  'objectIDs'?: Array<string>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'taskID',
      baseName: 'taskID',
      type: 'number',
    },
    {
      name: 'objectIDs',
      baseName: 'objectIDs',
      type: 'Array<string>',
    },
  ];

  static getAttributeTypeMap() {
    return BatchResponse.attributeTypeMap;
  }
}
