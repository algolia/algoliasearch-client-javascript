// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { PredictionsAffinities } from './predictionsAffinities';
import type { PredictionsOrderValue } from './predictionsOrderValue';
import type { PredictionsfunnelStage } from './predictionsfunnelStage';

export type Predictions = {
  funnel_stage?: PredictionsfunnelStage;

  order_value?: PredictionsOrderValue;

  affinities?: PredictionsAffinities;
};
