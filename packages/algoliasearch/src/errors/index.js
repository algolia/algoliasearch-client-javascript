// @flow

export const pluralError = (methodName: string) =>
  new Error(`The method "${methodName}s" can only be called with an array of values,
please wrap this in an array:

${methodName}s(value) --> ${methodName}s([value])
or
${methodName}s(value) --> ${methodName}(value)`);

export function deprecate(message: string) {
  // eslint-disable-next-line no-console
  console.warn(message);
}
