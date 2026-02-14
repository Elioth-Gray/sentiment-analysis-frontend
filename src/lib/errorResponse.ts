import type { ErrorResponse } from '@/types/response.type';

export const createErrorAction = (
  message: string,
  errors: string,
): ErrorResponse => ({
  status: 'failed',
  message,
  errors,
});
