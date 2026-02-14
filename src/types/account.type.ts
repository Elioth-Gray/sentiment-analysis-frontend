import type { SuccessResponse } from './response.type';

export type Account = {
  followers_count: number;
  follows_count: number;
  name: string;
  posts_count: number;
  profile_picture_url: string;
  username: string;
};

export type AccountProfileResponse = SuccessResponse<Account>;
