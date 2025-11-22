import { OrderSide, OrderType, TimeInForce, OrderStatus } from './common';

export interface AccountActiveOrdersRequest {
  account_index: number;
  market_id?: number;
  auth?: string;
}

export interface AccountInactiveOrdersRequest {
  account_index: number;
  market_id?: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
  auth?: string;
}

export interface OrderBooksRequest {
  market_id?: number;
}

export interface OrderBookDetailsRequest {
  market_id: number;
  depth?: number;
}

export interface OrderBookOrdersRequest {
  market_id: number;
  side?: OrderSide;
  limit?: number;
}

export interface RecentTradesRequest {
  market_id: number;
  limit?: number;
}

export interface TradesRequest {
  market_id?: number;
  account_index?: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface ExchangeStatsRequest {
  market_id?: number;
  period?: string;
}

export interface ExportRequest {
  account_index: number;
  start_time: number;
  end_time: number;
  format?: 'csv' | 'json';
  auth: string;
}

export interface OrderResponse {
  order_id: string;
  order_nonce: number;
  account_index: number;
  market_id: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: TimeInForce;
  price: string;
  size: string;
  filled_size: string;
  remaining_size: string;
  status: OrderStatus;
  created_at: number;
  updated_at: number;
}

export interface AccountActiveOrdersResponse {
  orders: OrderResponse[];
  total: number;
}

export interface AccountInactiveOrdersResponse {
  orders: OrderResponse[];
  total: number;
}

export interface OrderBooksResponse {
  order_books: OrderBookMetadata[];
}

export interface OrderBookMetadata {
  market_id: number;
  symbol: string;
  base_token: string;
  quote_token: string;
  min_order_size: string;
  min_order_size_base: string;
  min_order_size_quote: string;
  size_decimals: number;
  price_decimals: number;
  quote_decimals: number;
  taker_fee: string;
  maker_fee: string;
  status: string;
}

export interface OrderBookDetailsResponse {
  market_id: number;
  symbol: string;
  timestamp: number;
  bids: PriceLevel[];
  asks: PriceLevel[];
  last_price?: string;
  high_24h?: string;
  low_24h?: string;
  volume_24h?: string;
}

export interface PriceLevel {
  price: string;
  size: string;
  num_orders?: number;
}

export interface OrderBookOrdersResponse {
  market_id: number;
  side?: OrderSide;
  orders: BookOrder[];
}

export interface BookOrder {
  order_id: string;
  price: string;
  size: string;
  account_index: number;
  timestamp: number;
}

export interface RecentTradesResponse {
  market_id: number;
  trades: Trade[];
}

export interface Trade {
  trade_id: string;
  market_id: number;
  price: string;
  size: string;
  side: OrderSide;
  timestamp: number;
  maker_order_id?: string;
  taker_order_id?: string;
  maker_account?: number;
  taker_account?: number;
  maker_fee?: string;
  taker_fee?: string;
}

export interface TradesResponse {
  trades: Trade[];
  total: number;
}

export interface ExchangeStatsResponse {
  market_id?: number;
  volume_24h: string;
  high_24h: string;
  low_24h: string;
  price_change_24h: string;
  price_change_percentage_24h: string;
  num_trades_24h: number;
  open_interest?: string;
  funding_rate?: string;
}

export interface ExportResponse {
  file_url?: string;
  data?: unknown;
}
