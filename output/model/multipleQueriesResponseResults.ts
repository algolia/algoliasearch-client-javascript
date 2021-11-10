import { RequestFile } from './models';
import { MultipleQueriesResponseHits } from './multipleQueriesResponseHits';

export class MultipleQueriesResponseResults {
  'hits'?: Array<MultipleQueriesResponseHits>;
  'nbHits'?: number;
  'queryID'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'hits',
      baseName: 'hits',
      type: 'Array<MultipleQueriesResponseHits>',
    },
    {
      name: 'nbHits',
      baseName: 'nbHits',
      type: 'number',
    },
    {
      name: 'queryID',
      baseName: 'queryID',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueriesResponseResults.attributeTypeMap;
  }
}
