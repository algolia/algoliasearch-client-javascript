import type { ConsequenceQueryObject } from './consequenceQueryObject';

/**
 * When providing a string, it replaces the entire query string. When providing an object, it describes incremental edits to be made to the query string (but you can\'t do both).
 */
export type ConsequenceQuery = ConsequenceQueryObject | string;
