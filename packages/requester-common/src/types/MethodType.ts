export const MethodEnum: Readonly<Record<string, MethodType>> = {
  Delete: 'DELETE',
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
};

export type MethodType = 'DELETE' | 'GET' | 'POST' | 'PUT';
