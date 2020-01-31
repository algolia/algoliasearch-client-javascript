import { SearchIndex } from '.';

export type CreateIndex = <
  TMethods extends {
    readonly [key: string]: (base: SearchIndex) => (...args: any) => any;
  }
>(
  indexName: string,
  options?: { readonly methods?: TMethods }
) => SearchIndex &
  {
    [key in keyof TMethods extends string ? keyof TMethods : never]: ReturnType<TMethods[key]>; // eslint-disable-line @typescript-eslint/generic-type-naming
  };
