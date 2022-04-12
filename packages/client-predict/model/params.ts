import type { ModelsToRetrieve } from './modelsToRetrieve';
import type { TypesToRetrieve } from './typesToRetrieve';

/**
 * Object with models and types to retrieve.
 */
export type Params = {
  /**
   * List with model types for which to retrieve predictions.
   */
  modelsToRetrieve?: ModelsToRetrieve[];
  /**
   * List with types to be retrieved.
   */
  typesToRetrieve?: TypesToRetrieve[];
};
