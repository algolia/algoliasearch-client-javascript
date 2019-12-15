import { SynonymType } from '.';

export type SearchSynonymsOptions = {
  /**
   * The synonym type.
   */
  readonly type?: SynonymType | readonly SynonymType[];

  /**
   * Page to retrieve.
   */
  readonly page?: number;

  /**
   * Number of hits per page.
   */
  readonly hitsPerPage?: number;
};
