export function createApiError(
  message: string,
  status: number
): Error & { readonly status: number } {
  return {
    name: 'ApiError',
    message,
    status,
  };
}
