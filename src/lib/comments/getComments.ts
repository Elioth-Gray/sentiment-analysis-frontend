import { Response_Status, type ErrorResponse } from "@/types/response.type";
import axiosAdmin from "../axios";
import { createErrorAction } from "../errorResponse";
import axios from "axios";
import type { CommentsResponse } from "@/types/comment.type";

export const getCommentsAction = async (): Promise<
  CommentsResponse | ErrorResponse
> => {
  try {
    const response = await axiosAdmin.get("/comments/");
    if (response.data.status === Response_Status.SUCCESS) {
      return response.data as CommentsResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return createErrorAction(
        error.response.data.message,
        error.response.data.error || "Unknown error",
      );
    }
    return createErrorAction("An unexpected error occurred", "Unknown error");
  }
};
