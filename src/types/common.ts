export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export type OrderSide = 'buy' | 'sell';
export type OrderType = 'limit' | 'market';
export type TimeInForce = 'gtc' | 'ioc' | 'fok' | 'post_only';
export type OrderStatus = 'active' | 'filled' | 'cancelled' | 'expired' | 'rejected';
export type AccountStatus = 0 | 1;
export type PositionDirection = -1 | 0 | 1;

export interface Pagination {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface DateRange {
  start_time?: number;
  end_time?: number;
}
