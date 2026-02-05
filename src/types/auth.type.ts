import type { SuccessResponse } from './response.type';

export type User = {
  id: string;
  email: string;
  username: string;
};

type Auth = {
  token: string;
  user: User;
};

export type AuthResponse = SuccessResponse<Auth>;
export type SignOutResponse = SuccessResponse;
export type ProfileResponse = SuccessResponse<User>;
