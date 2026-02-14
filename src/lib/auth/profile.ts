import type { ProfileResponse } from '@/types/auth.type';
import { Response_Status, type ErrorResponse } from '@/types/response.type';
import axiosAdmin from '../axios';
import { createErrorAction } from '../errorResponse';
import axios from 'axios';

export const ProfileAction = async (): Promise<
  ProfileResponse | ErrorResponse
> => {
  try {
    const response = await axiosAdmin.get('/auth/profile');
    if (response.data.status === Response_Status.SUCCESS) {
      return response.data as ProfileResponse;
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
