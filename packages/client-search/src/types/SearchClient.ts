import { Transporter } from '@algolia/transporter';

export type SearchClient = {
  /**
   * The application id.
   */
  readonly appId: string;

  /**
   * The underlying transporter.
   */
  readonly transporter: Transporter;

  /**
   * Mutates the transporter, adding the given user agent.
   */
  readonly addAlgoliaAgent: (segment: string, version?: string) => void;

  /**
   * Clears both requests and responses caches.
   */
  readonly clearCache: () => Readonly<Promise<void>>;
};
