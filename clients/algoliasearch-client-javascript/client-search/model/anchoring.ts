/**
 * Whether the pattern parameter must match the beginning or the end of the query string, or both, or none.
 */
export enum Anchoring {
  Is = 'is',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  Contains = 'contains',
}
