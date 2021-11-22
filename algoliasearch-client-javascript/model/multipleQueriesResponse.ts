import { SearchResponse } from './searchResponse';

export class MultipleQueriesResponse {
  'results'?: Array<SearchResponse>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'results',
      baseName: 'results',
      type: 'Array<SearchResponse>',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueriesResponse.attributeTypeMap;
  }
}
