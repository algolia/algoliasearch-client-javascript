// @flow

export default function attachParameters(original, ...extra) {
  const methodNames = Object.keys(original);
  const augmentedMethods = methodNames.reduce(
    (methods, method) => ({
      ...methods,
      [method]: (...args) => original[method](...extra, ...args),
    }),
    {}
  );
  return augmentedMethods;
}
