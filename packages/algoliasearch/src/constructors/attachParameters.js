// @flow

/**
 * Takes an object of functions, adds parameters
 * The functions have two arguments.
 * 1: `args`, for regular arguments, is an object
 * 2: `meta`, for extra arguments. 
 * 
 * ```js
 * attachParameters(originalFunctions, {
 *   args: { ...anyArgument },
 *   meta: { ...anyMetaArgument }
 * });
 * ```
 *
 * @param {Object} original functions to transform
 * @param {Object} extra arguments to add
 * @param {Object} extra.args things to add to the first argument of each function
 * @param {Object} extra.meta things to add to the second argument of each function
 * @returns {Object} augmented version of `original`
 */
export default function attachParameters(
  original: { [key: string]: Function },
  extra: {
    args?: {
      [key: string]: any,
    },
    meta?: {
      [key: string]: any,
    },
  }
) {
  const methodNames = Object.keys(original);

  const augmentedMethods = methodNames.reduce(
    (methods, method) => ({
      ...methods,
      [method]: ({ ...args }, { ...meta }) =>
        original[method](
          { ...extra.args, ...args },
          { ...extra.meta, ...meta }
        ),
    }),
    {}
  );

  return augmentedMethods;
}
