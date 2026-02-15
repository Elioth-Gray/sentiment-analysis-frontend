import { Response_Status, type ErrorResponse } from '@/types/response.type';
import axiosAdmin from '../axios';
import { createErrorAction } from '../errorResponse';
import axios from 'axios';
import type { PostsResponse } from '@/types/posts.type';

export const getPostsAction = async (): Promise<
  PostsResponse | ErrorResponse
> => {
  try {
    const response = await axiosAdmin.get('/posts/');
    if (response.data.status === Response_Status.SUCCESS) {
      return response.data as PostsResponse;
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
