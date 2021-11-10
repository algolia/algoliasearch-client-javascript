import { RequestFile } from './models';

export class MultipleQueriesResponseHits {
  /**
   * Unique identifier of the object
   */
  'objectID'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'objectID',
      baseName: 'objectID',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueriesResponseHits.attributeTypeMap;
  }
}
