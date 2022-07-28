// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { PredictionsAffinities } from './predictionsAffinities';
import type { PredictionsFunnelStage } from './predictionsFunnelStage';
import type { PredictionsOrderValue } from './predictionsOrderValue';

export type Predictions = {
  funnel_stage?: PredictionsFunnelStage;

  order_value?: PredictionsOrderValue;

  affinities?: PredictionsAffinities;
};
