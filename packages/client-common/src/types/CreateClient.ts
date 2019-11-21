export type CreateClient<TClient, TOptions> = <
  TMethods extends {
    readonly [key: string]: (base: TClient) => (...args: any) => any;
  }
>(
  options: TOptions & { readonly methods?: TMethods }
) => TClient &
  {
    [key in keyof TMethods extends string ? keyof TMethods : never]: ReturnType<TMethods[key]>; // eslint-disable-line @typescript-eslint/generic-type-naming
  };
