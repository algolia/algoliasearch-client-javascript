import type { GetTopFilterForAttribute } from './getTopFilterForAttribute';

export type GetTopFilterForAttributeResponse = {
  /**
   * A list of filters for the given attributes.
   */
  values: GetTopFilterForAttribute[];
};
