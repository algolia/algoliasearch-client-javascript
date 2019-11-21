import { SearchIndex } from '.';

export type CreateIndex = <
  TMethods extends { readonly [key: string]: (base: SearchIndex) => (...args: any) => any },
  TKey extends keyof TMethods,
  TValue extends TMethods[TKey]
>(
  indexName: string,
  options?: { readonly methods?: TMethods }
) => SearchIndex & { [key in TKey extends string ? TKey : never]: ReturnType<TValue> }; // eslint-disable-line @typescript-eslint/generic-type-naming
