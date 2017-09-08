// @flow

export default function attachParameters(
  original: { [key: string]: Function },
  extra: { [key: string]: any }
) {
  const methodNames = Object.keys(original);

  const augmentedMethods = methodNames.reduce(
    (methods, method) => ({
      ...methods,
      [method]: ({ ...args }, { ...meta }) =>
        original[method]({ ...args }, { ...extra, ...meta }),
    }),
    {}
  );

  return augmentedMethods;
}
