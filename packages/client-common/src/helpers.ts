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

type Methods<TBase> = {
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly [key: string]: (base: TBase) => (...args: any[]) => any;
};

type AddedMethods<TBase, TMethods extends Methods<TBase>> = TBase &
  {
    [TKey in keyof TMethods extends string ? keyof TMethods : never]: ReturnType<TMethods[TKey]>;
  };

export function addMethods<TBase extends {}, TMethods extends Methods<TBase>>(
  base: TBase,
  methods?: TMethods
): AddedMethods<TBase, TMethods> {
  if (!methods) {
    return base as AddedMethods<TBase, TMethods>;
  }

  Object.keys(methods).forEach(key => {
    // eslint-disable-next-line functional/immutable-data, no-param-reassign
    (base as any)[key] = methods[key](base);
  });

  return base as AddedMethods<TBase, TMethods>;
}

export function encode(format: string, ...args: readonly any[]): string {
  // eslint-disable-next-line functional/no-let
  let i = 0;

  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}
