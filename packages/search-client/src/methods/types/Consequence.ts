import { ConsequenceParams, SearchOptions } from './ConsequenceParams';
import { ConsequencePromote } from './ConsequencePromote';
import { Hide } from './Hide';

export type Consequence = {
  /* eslint-disable functional/prefer-readonly-type */

  /** Additional search parameters. Any valid search parameter is allowed. */
  params?: ConsequenceParams & SearchOptions;

  /** Objects to promote as hits. */
  promote?: ConsequencePromote[];

  /** Objects to hide from hits. */
  hide?: Hide[];

  /**
   * Custom JSON object that will be appended to the userData array in the response.
   * This object is not interpreted by the API. It is limited to 1kB of minified JSON.
   */
  userData?: any;
};
