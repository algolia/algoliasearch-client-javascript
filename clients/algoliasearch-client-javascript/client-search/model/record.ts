import { HighlightResult } from './highlightResult';
import { RankingInfo } from './rankingInfo';
import { SnippetResult } from './snippetResult';

/**
 * A single record
 */
export type Record = {
  /**
   * Unique identifier of the object
   */
  objectID: string;
  _highlightResult?: HighlightResult;
  _snippetResult?: SnippetResult;
  _rankingInfo?: RankingInfo;
  _distinctSeqID?: number;
};
