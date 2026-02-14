import type { LoginSchema } from '@/schema/Auth.Schema';
import type { AuthResponse } from '@/types/auth.type';
import { Response_Status, type ErrorResponse } from '@/types/response.type';
import type z from 'zod';
import { createErrorAction } from '../errorResponse';
import { useAuthStore } from '../store/useAuthStore';
import { BASE_URL } from '@/utils/env';
import axios from 'axios';

export const LoginAction = async (
  data: z.infer<typeof LoginSchema>,
): Promise<AuthResponse | ErrorResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status === Response_Status.SUCCESS) {
      const { token, user } = response.data.data;
      useAuthStore.getState().setAuth(token, user);

      return response.data as AuthResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return createErrorAction(
        error.response.data.message,
        error.response.data.error || 'Unknown error',
      );
    }
    return createErrorAction('An unexpected error occurred', 'Unknown error');
  }
};
