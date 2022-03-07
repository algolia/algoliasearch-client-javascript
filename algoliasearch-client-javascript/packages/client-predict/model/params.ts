/**
 * Object with models and types to retrieve.
 */
export type Params = {
  /**
   * List with model types for which to retrieve predictions.
   */
  modelsToRetrieve?: ParamsModelsToRetrieve[];
  /**
   * List with types to be retrieved.
   */
  typesToRetrieve?: ParamsTypesToRetrieve[];
};

export type ParamsModelsToRetrieve =
  | 'affinities'
  | 'funnel_stage'
  | 'order_value';

export type ParamsTypesToRetrieve = 'properties' | 'segments';
