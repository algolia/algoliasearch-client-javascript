import type { GetTopFilterAttribute } from './getTopFilterAttribute';

export type GetTopFilterAttributesResponse = {
  /**
   * A list of attributes with their count.
   */
  attributes: GetTopFilterAttribute[];
};
