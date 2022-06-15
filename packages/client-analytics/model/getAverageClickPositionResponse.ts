import type { AverageClickEvent } from './averageClickEvent';

export type GetAverageClickPositionResponse = {
  /**
   * The average of all the click count event.
   */
  average: number;
  /**
   * The number of click event.
   */
  clickCount: number;
  /**
   * A list of average click position with their date.
   */
  dates: AverageClickEvent[];
};
