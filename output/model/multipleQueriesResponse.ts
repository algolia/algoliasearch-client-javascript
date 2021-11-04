import { RequestFile } from './models';
import { MultipleQueriesResponseResults } from './multipleQueriesResponseResults';

export class MultipleQueriesResponse {
  'results'?: Array<MultipleQueriesResponseResults>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'results',
      baseName: 'results',
      type: 'Array<MultipleQueriesResponseResults>',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueriesResponse.attributeTypeMap;
  }
}
