import { HighlightResult } from './highlightResult';
import { RankingInfo } from './rankingInfo';
import { SnippetResult } from './snippetResult';

/**
 * A Recommend record
 */
export type RecommendRecord = {
  /**
   * Unique identifier of the object
   */
  objectID: string;
  _highlightResult?: HighlightResult;
  _snippetResult?: SnippetResult;
  _rankingInfo?: RankingInfo;
  _distinctSeqID?: number;
  /**
   * The recommendation score
   */
  _score: number;
};
