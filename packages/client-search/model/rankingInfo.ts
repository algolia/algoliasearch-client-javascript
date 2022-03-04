import type { RankingInfoMatchedGeoLocation } from './rankingInfoMatchedGeoLocation';

export type RankingInfo = {
  /**
   * This field is reserved for advanced usage.
   */
  filters?: number;
  /**
   * Position of the most important matched attribute in the attributes to index list.
   */
  firstMatchedWord?: number;
  /**
   * Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision (in meters).
   */
  geoDistance?: number;
  /**
   * Precision used when computing the geo distance, in meters.
   */
  geoPrecision?: number;
  matchedGeoLocation?: { [key: string]: RankingInfoMatchedGeoLocation };
  /**
   * Number of exactly matched words.
   */
  nbExactWords?: number;
  /**
   * Number of typos encountered when matching the record.
   */
  nbTypos?: number;
  /**
   * Present and set to true if a Rule promoted the hit.
   */
  promoted?: boolean;
  /**
   * When the query contains more than one word, the sum of the distances between matched words (in meters).
   */
  proximityDistance?: number;
  /**
   * Custom ranking for the object, expressed as a single integer value.
   */
  userScore?: number;
  /**
   * Number of matched words, including prefixes and typos.
   */
  word?: number;
};
