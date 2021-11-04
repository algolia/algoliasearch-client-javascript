import { RequestFile } from './models';

export class MultipleQueriesResponseResults {
  'hits'?: Array<{ [key: string]: any }>;
  'nbHits'?: number;
  'queryID'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'hits',
      baseName: 'hits',
      type: 'Array<{ [key: string]: any; }>',
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
