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

// eslint-disable-next-line functional/prefer-readonly-type
export type ConstructorOf<TObject> = new (...input: any[]) => TObject;
