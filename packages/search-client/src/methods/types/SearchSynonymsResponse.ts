import { Synonym } from './Synonym';

export type SearchSynonymsResponse = {
  readonly hits: readonly Synonym[];
  readonly nbHits: number;
};
