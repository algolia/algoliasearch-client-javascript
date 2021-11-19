import { RequestFile } from './models';
import { HighlightResult } from './highlightResult';
import { RankingInfo } from './rankingInfo';
import { SnippetResult } from './snippetResult';

/**
 * A single record
 */
export class Record extends null<String, object> {
  /**
   * Unique identifier of the object
   */
  'objectID': string;
  '_highlightResult'?: HighlightResult;
  '_snippetResult'?: SnippetResult;
  '_rankingInfo'?: RankingInfo;
  '_distinctSeqID'?: number;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'objectID',
      baseName: 'objectID',
      type: 'string',
    },
    {
      name: '_highlightResult',
      baseName: '_highlightResult',
      type: 'HighlightResult',
    },
    {
      name: '_snippetResult',
      baseName: '_snippetResult',
      type: 'SnippetResult',
    },
    {
      name: '_rankingInfo',
      baseName: '_rankingInfo',
      type: 'RankingInfo',
    },
    {
      name: '_distinctSeqID',
      baseName: '_distinctSeqID',
      type: 'number',
    },
  ];

  static getAttributeTypeMap() {
    return super.getAttributeTypeMap().concat(Record.attributeTypeMap);
  }
}
