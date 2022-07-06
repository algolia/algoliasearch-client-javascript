import type { Affinities } from './affinities';

/**
 * Prediction for the **affinities** model.
 */
export type PredictionsAffinities = {
  value?: Affinities[];
  lastUpdatedAt?: string;
};
