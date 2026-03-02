import type { Meta, SuccessResponse } from "./response.type";

export type Comment = {
  id: number;
  post_id: number;
  text: string;
  is_protest: boolean;
  protest_score: number;
  timestamp: string;
};

export type CommentsResponse = SuccessResponse<Comment[]> & {
  meta: Meta;
};
