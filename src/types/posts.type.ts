import type { Meta, SuccessResponse } from "./response.type";

export type Post = {
  id: string;
  caption: string;
  comments_count: number;
  like_count: number;
  instagram_post_id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
};

export type Sync = {
  message: string;
  new_comments: number;
  posts_processed: number;
  success: boolean;
  total_comments: number;
  updated_comments: number;
};

export type SyncAccountResponse = SuccessResponse<Sync>;
export type PostsResponse = SuccessResponse<Post[]> & {
  meta: Meta;
};
