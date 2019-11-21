export type CreateClient<TClient, TOptions> = <
  TMethods extends { readonly [key: string]: (base: TClient) => (...args: any) => any },
  TKey extends keyof TMethods,
  TValue extends TMethods[TKey]
>(
  options: TOptions & { readonly methods?: TMethods }
) => TClient & { [key in TKey extends string ? TKey : never]: ReturnType<TValue> }; // eslint-disable-line @typescript-eslint/generic-type-naming
