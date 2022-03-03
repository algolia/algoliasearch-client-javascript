import type { ConsequenceHide } from './consequenceHide';
import type { ConsequenceParams } from './consequenceParams';
import type { Promote } from './promote';

/**
 * Consequence of the Rule.
 */
export type Consequence = {
  params?: ConsequenceParams;
  /**
   * Objects to promote as hits.
   */
  promote?: Promote[];
  /**
   * Only use in combination with the promote consequence. When true, promoted results will be restricted to match the filters of the current search. When false, the promoted results will show up regardless of the filters.
   */
  filterPromotes?: boolean;
  /**
   * Objects to hide from hits. Each object must contain an objectID field. By default, you can hide up to 50 items per rule.
   */
  hide?: ConsequenceHide[];
  /**
   * Custom JSON object that will be appended to the userData array in the response. This object isn\'t interpreted by the API. It\'s limited to 1kB of minified JSON.
   */
  userData?: Record<string, any>;
};
