export const MethodEnum: { readonly [key: string]: MethodType } = {
  Delete: 'DELETE',
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
};

export type MethodType = 'DELETE' | 'GET' | 'POST' | 'PUT';
