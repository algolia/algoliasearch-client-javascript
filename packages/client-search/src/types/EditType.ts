export const EditEnum: { readonly [key: string]: EditType } = {
  Remove: 'remove',
  Replace: 'replace',
};

export type EditType = 'remove' | 'replace';
