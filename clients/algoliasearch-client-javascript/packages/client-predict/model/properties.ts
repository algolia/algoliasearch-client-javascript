/**
 * Properties for the user profile.
 */
export type Properties = {
  /**
   * Raw user properties (key-value pairs).
   */
  raw?: Record<string, any>;
  /**
   * Computed user properties (key-value pairs).
   */
  computed?: Record<string, any>;
  /**
   * Custom user properties (key-value pairs).
   */
  custom?: Record<string, any>;
};
