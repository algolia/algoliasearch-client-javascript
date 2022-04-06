import type { HighlightResult } from './highlightResult';
import type { RankingInfo } from './rankingInfo';
import type { SnippetResult } from './snippetResult';

/**
 * A single hit.
 */
export type Hit = Record<string, any> & {
  /**
   * Unique identifier of the object.
   */
  objectID: string;
  _highlightResult?: HighlightResult;
  _snippetResult?: SnippetResult;
  _rankingInfo?: RankingInfo;
  _distinctSeqID?: number;
};
