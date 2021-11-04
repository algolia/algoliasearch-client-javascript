import { RequestFile } from './models';

export class MultipleQueries {
  /**
   * The Algolia index name
   */
  'indexName': string;
  /**
   * The query to search for
   */
  'query'?: string;
  /**
   * Perform a search query with `default`, will search for facet values if `facet` is given
   */
  'type'?: MultipleQueries.TypeEnum;
  /**
   * The `facet` name
   */
  'facet'?: string;
  /**
   * A key-value mapping of additional search parameters
   */
  'params'?: { [key: string]: object };

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'indexName',
      baseName: 'indexName',
      type: 'string',
    },
    {
      name: 'query',
      baseName: 'query',
      type: 'string',
    },
    {
      name: 'type',
      baseName: 'type',
      type: 'MultipleQueries.TypeEnum',
    },
    {
      name: 'facet',
      baseName: 'facet',
      type: 'string',
    },
    {
      name: 'params',
      baseName: 'params',
      type: '{ [key: string]: object; }',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueries.attributeTypeMap;
  }
}

export namespace MultipleQueries {
  export enum TypeEnum {
    Default = <any>'default',
    Facet = <any>'facet',
  }
}
