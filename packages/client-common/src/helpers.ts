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

export function addMethods<TClient>(base: any, methods: readonly Function[] = []): TClient {
  // eslint-disable-next-line no-param-reassign
  methods.forEach(method => (base = method(base)));

  return base;
}

export function addMethod<TBase, TFunctionReturnType>(
  obj: TBase,
  method: (base: TBase) => TFunctionReturnType
): TFunctionReturnType {
  return addMethods(obj, [method]);
}

export function encode(format: string, ...args: readonly any[]): string {
  // eslint-disable-next-line functional/no-let
  let i = 0;

  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}
