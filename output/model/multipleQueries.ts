import { RequestFile } from './models';

export class MultipleQueries {
  /**
   * The Algolia index name
   */
  'indexName': string;
  /**
   * The text to search in the index.
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
   * A query string of search parameters
   */
  'params'?: string;

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
      type: 'string',
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
