// @flow

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
