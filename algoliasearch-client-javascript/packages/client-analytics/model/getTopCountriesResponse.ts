import type { GetTopCountriesResponseCountries } from './getTopCountriesResponseCountries';

export type GetTopCountriesResponse = {
  /**
   * A list of countries with their count.
   */
  countries: GetTopCountriesResponseCountries[];
};
