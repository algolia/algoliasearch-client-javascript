// @flow

export class AlgoliaError extends Error {
  constructor(message: string = '', ...args: any[]) {
    super(message, ...args);
    this.message = message;
    this.name = 'AlgoliaError';
  }
}

export const pluralError = (methodName: string) =>
  new AlgoliaError(`The method "${
    methodName
  }s" can only be called with an array of values,
please wrap this in an array:

${methodName}s(value) --> ${methodName}s([value])
or
${methodName}s(value) --> ${methodName}(value)`);

export function deprecate(message: string) {
  // eslint-disable-next-line no-console
  console.warn(message);
}
