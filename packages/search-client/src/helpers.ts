/* eslint no-param-reassign: 0 */ // --> OFF
export function shuffle<TData>(array: TData[]): TData[] {
  for (let c = array.length - 1; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    array[c] = array[b];
    array[b] = a;
  }

  return array;
}

export type ConstructorOf<TObject> = new (...input: any[]) => TObject;
