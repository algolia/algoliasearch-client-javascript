import type { ClickPosition } from './clickPosition';

export type GetClickPositionsResponse = {
  /**
   * A list of the click positions with their click count.
   */
  positions: ClickPosition[];
};
