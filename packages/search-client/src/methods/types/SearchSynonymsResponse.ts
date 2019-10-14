import { Synonym } from './Synonym';

export type SearchSynonymsResponse = {
  /* eslint-disable functional/prefer-readonly-type */
  hits: Synonym[];
  nbHits: number;
};
