import type { HighlightResult } from './highlightResult';
import type { RankingInfo } from './rankingInfo';
import type { SnippetResult } from './snippetResult';

/**
 * A Recommend hit.
 */
export type RecommendHit = {
  /**
   * Unique identifier of the object.
   */
  objectID: string;
  _highlightResult?: HighlightResult;
  _snippetResult?: SnippetResult;
  _rankingInfo?: RankingInfo;
  _distinctSeqID?: number;
  /**
   * The recommendation score.
   */
  _score: number;
};
