import type { GetClickPositionsResponsePositions } from './getClickPositionsResponsePositions';

export type GetClickPositionsResponse = {
  /**
   * A list of the click positions with their click count.
   */
  positions: GetClickPositionsResponsePositions[];
};
