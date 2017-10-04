// @flow

/**
 * Takes an object of functions, adds parameters
 * The functions have two arguments.
 * 1: `args`, for regular arguments, is an object
 * 2: `meta`, for extra arguments. 
 * 
 * ```js
 * const originalFunctions = {
 *   something(boo, { color }) {},
 *   search(params, { requester, indexName }) {},
 * }
 * const attached = attachParameters(originalFunctions, {
 *   requester() { console.log('hello'); },
 * });
 * 
 * // attached is now:
 * attached = {
 *   something(boo, { color, requester() { console.log('hello'); } }) {},
 *   search(params, { requester() { console.log('hello'); }, indexName }) {},
 * }
 * ```
 *
 * @param {Object} original functions to transform
 * @param {Object} extra arguments to add to the second argument (which is an object)
 * @returns {Object} augmented version of `original`
 */
export default function attachParameters(
  original: { [key: string]: Function },
  extra: {
    [key: string]: any,
  }
) {
  const methodNames = Object.keys(original);

  const augmentedMethods = methodNames.reduce(
    (methods, method) => ({
      ...methods,
      [method]: (argument, { ...meta }) =>
        original[method](argument, { ...meta, ...extra }),
    }),
    {}
  );

  return augmentedMethods;
}
