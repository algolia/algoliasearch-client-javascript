import { ConsequenceParams, ConsequencePromote, Hide, SearchOptions } from '.';

export type Consequence = {
  /** Additional search parameters. Any valid search parameter is allowed. */
  readonly params?: ConsequenceParams & SearchOptions;

  /** Objects to promote as hits. */
  readonly promote?: readonly ConsequencePromote[];

  /** Objects to hide from hits. */
  readonly hide?: readonly Hide[];

  /**
   * Custom JSON object that will be appended to the userData array in the response.
   * This object is not interpreted by the API. It is limited to 1kB of minified JSON.
   */
  readonly userData?: any;
};
