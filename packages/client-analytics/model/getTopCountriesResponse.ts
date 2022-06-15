import type { TopCountry } from './topCountry';

export type GetTopCountriesResponse = {
  /**
   * A list of countries with their count.
   */
  countries: TopCountry[];
};
