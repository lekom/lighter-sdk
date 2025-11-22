export interface CandlesticksRequest {
  market_id: number;
  interval: CandlestickInterval;
  start_time?: number;
  end_time?: number;
  limit?: number;
}

export interface FundingsRequest {
  market_id: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
}

export interface FundingRatesRequest {
  market_id?: number;
}

export interface FastBridgeInfoRequest {
  from_chain?: string;
  to_chain?: string;
}

export type CandlestickInterval =
  | '1m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '4h'
  | '1d'
  | '1w'
  | '1M';

export interface Candlestick {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  num_trades?: number;
}

export interface CandlesticksResponse {
  market_id: number;
  interval: CandlestickInterval;
  candlesticks: Candlestick[];
}

export interface FundingRate {
  market_id: number;
  timestamp: number;
  funding_rate: string;
  index_price: string;
  mark_price: string;
}

export interface FundingsResponse {
  market_id: number;
  fundings: FundingRate[];
}

export interface FundingRatesResponse {
  funding_rates: CurrentFundingRate[];
}

export interface CurrentFundingRate {
  market_id: number;
  market_symbol: string;
  current_funding_rate: string;
  predicted_funding_rate: string;
  next_funding_time: number;
  index_price: string;
  mark_price: string;
}

export interface FastBridgeInfoResponse {
  supported_chains: ChainInfo[];
  bridges: BridgeRoute[];
}

export interface ChainInfo {
  chain_id: string;
  chain_name: string;
  native_token: string;
}

export interface BridgeRoute {
  from_chain: string;
  to_chain: string;
  min_amount: string;
  max_amount: string;
  estimated_time: number;
  fee_percentage: string;
}
