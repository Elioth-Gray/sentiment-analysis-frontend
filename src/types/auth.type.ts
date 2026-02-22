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

type RefreshToken = {
  token: string;
};

export type JWTPayload = {
  fresh: boolean;
  iat: number;
  jti: string;
  type: string;
  sub: string;
  nbf: number;
  exp: number;
};

export type AuthResponse = SuccessResponse<Auth>;
export type SignOutResponse = SuccessResponse;
export type ProfileResponse = SuccessResponse<User>;
export type RefreshTokenResponse = SuccessResponse<RefreshToken>;
