export interface ExplorerAccountLogsRequest {
  account_index: number;
  limit?: number;
  offset?: number;
}

export interface ExplorerAccountPositionsRequest {
  account_index: number;
}

export interface ExplorerBatchesRequest {
  limit?: number;
  offset?: number;
}

export interface ExplorerBatchRequest {
  batch_id: string;
}

export interface ExplorerBlocksRequest {
  limit?: number;
  offset?: number;
}

export interface ExplorerBlockRequest {
  block_number: number;
}

export interface ExplorerMarketsRequest {
  market_id?: number;
}

export interface ExplorerSearchRequest {
  query: string;
  type?: 'account' | 'transaction' | 'block' | 'market';
}

export interface ExplorerStatsRequest {
  period?: '24h' | '7d' | '30d' | 'all';
}

export interface ExplorerAccountLogsResponse {
  account_index: number;
  logs: ExplorerLog[];
  total: number;
}

export interface ExplorerLog {
  log_id: string;
  event_type: string;
  data: Record<string, unknown>;
  timestamp: number;
  block_number: number;
  tx_hash: string;
}

export interface ExplorerAccountPositionsResponse {
  account_index: number;
  positions: ExplorerPosition[];
}

export interface ExplorerPosition {
  market_id: number;
  market_symbol: string;
  size: string;
  entry_price: string;
  current_price: string;
  unrealized_pnl: string;
  realized_pnl: string;
  liquidation_price?: string;
}

export interface ExplorerBatchesResponse {
  batches: ExplorerBatch[];
  total: number;
}

export interface ExplorerBatch {
  batch_id: string;
  block_number: number;
  num_transactions: number;
  timestamp: number;
  status: string;
}

export interface ExplorerBatchResponse {
  batch_id: string;
  block_number: number;
  transactions: string[];
  timestamp: number;
  status: string;
}

export interface ExplorerBlocksResponse {
  blocks: ExplorerBlock[];
  total: number;
}

export interface ExplorerBlock {
  block_number: number;
  block_hash: string;
  parent_hash: string;
  timestamp: number;
  num_transactions: number;
  num_batches: number;
}

export interface ExplorerBlockResponse {
  block_number: number;
  block_hash: string;
  parent_hash: string;
  timestamp: number;
  transactions: string[];
  batches: string[];
  state_root: string;
}

export interface ExplorerMarketsResponse {
  markets: ExplorerMarket[];
}

export interface ExplorerMarket {
  market_id: number;
  symbol: string;
  base_token: string;
  quote_token: string;
  current_price: string;
  volume_24h: string;
  high_24h: string;
  low_24h: string;
  price_change_24h: string;
  open_interest?: string;
  num_trades_24h: number;
  status: string;
}

export interface ExplorerSearchResponse {
  results: SearchResult[];
  total: number;
}

export interface SearchResult {
  type: 'account' | 'transaction' | 'block' | 'market';
  id: string;
  data: Record<string, unknown>;
  relevance_score?: number;
}

export interface ExplorerStatsResponse {
  period: string;
  total_accounts: number;
  total_transactions: number;
  total_volume: string;
  total_trades: number;
  active_accounts: number;
  new_accounts: number;
  average_block_time: number;
  total_blocks: number;
}
