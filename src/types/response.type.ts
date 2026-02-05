export const Response_Status = {
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export type ResponseType =
  (typeof Response_Status)[keyof typeof Response_Status];

export type SuccessResponse<T = unknown> = {
  status: typeof Response_Status.SUCCESS;
  message: string;
  data?: T;
};

export type ErrorResponse = {
  status: typeof Response_Status.FAILED;
  message: string;
  errors: string[];
};

export type Meta = {
  has_next: boolean;
  has_prev: boolean;
  next_page: number | null;
  page: number;
  per_page: number;
  prev_page: number | null;
  total_items: number;
  total_pages: number;
};
