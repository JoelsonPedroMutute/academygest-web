export interface ApiResponse<T> {
  success: boolean;

  message: string;

  data: T;
}

export interface PaginatedResponse<T> {
  current_page: number;

  data: T[];

  first_page_url: string;

  from: number;

  last_page: number;

  last_page_url: string;

  next_page_url?: string;

  path: string;

  per_page: number;

  prev_page_url?: string;

  to: number;

  total: number;
}

export interface ApiError {
  message: string;

  errors?: Record<string, string[]>;
}
