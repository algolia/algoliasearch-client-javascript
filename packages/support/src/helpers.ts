import { ComposableOptions } from './types/ComposableOptions';

// eslint-disable-next-line functional/prefer-readonly-type
export function shuffle<TData>(array: TData[]): TData[] {
  let c = array.length - 1; // eslint-disable-line functional/no-let

  // eslint-disable-next-line functional/no-loop-statement
  for (c; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    array[c] = array[b]; // eslint-disable-line functional/immutable-data, no-param-reassign
    array[b] = a; // eslint-disable-line functional/immutable-data, no-param-reassign
  }

  return array;
}

export function compose<TObject>(obj: any, options?: ComposableOptions): TObject {
  if (options !== undefined && options.methods !== undefined) {
    options.methods.forEach(method => {
      // eslint-disable-next-line
      Object.assign(obj, method(obj));
    });
  }

  return obj;
}

export function encode(format: string, ...args: readonly any[]): string {
  // eslint-disable-next-line functional/no-let
  let i = 0;

  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}

export function encodeQueryParameters(parameters: { readonly [key: string]: any }): string {
  const parametersKeys = Object.keys(parameters);

  return `${parametersKeys.map(key => encode('%s=%s', key, parameters[key])).join('&')}`;
}
