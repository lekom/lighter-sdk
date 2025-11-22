import { AccountStatus, PositionDirection } from './common';

export interface AccountRequest {
  account_index: number;
}

export interface AccountsByL1AddressRequest {
  l1_address: string;
}

export interface AccountLimitsRequest {
  account_index: number;
}

export interface AccountMetadataRequest {
  account_index: number;
}

export interface PnLRequest {
  account_index: number;
  start_time?: number;
  end_time?: number;
}

export interface L1MetadataRequest {
  l1_address: string;
}

export interface ChangeAccountTierRequest {
  account_index: number;
  tier: number;
  signature: string;
}

export interface LiquidationsRequest {
  account_index?: number;
  market_id?: number;
  limit?: number;
  offset?: number;
}

export interface PositionFundingRequest {
  account_index: number;
  market_id?: number;
  start_time?: number;
  end_time?: number;
}

export interface AccountResponse {
  account_index: number;
  l1_address: string;
  status: AccountStatus;
  collateral: string;
  positions: Position[];
  created_at?: number;
  updated_at?: number;
}

export interface Position {
  market_id: number;
  market_symbol?: string;
  direction: PositionDirection;
  size: string;
  average_entry_price: string;
  position_value: string;
  unrealized_pnl: string;
  realized_pnl: string;
  open_order_count: number;
  liquidation_price?: string;
  leverage?: string;
  margin?: string;
}

export interface AccountsByL1AddressResponse {
  l1_address: string;
  accounts: AccountInfo[];
}

export interface AccountInfo {
  account_index: number;
  status: AccountStatus;
  created_at: number;
}

export interface AccountLimitsResponse {
  account_index: number;
  max_leverage: string;
  max_position_size: string;
  max_order_size: string;
  tier: number;
}

export interface ApiKeysResponse {
  keys: ApiKey[];
}

export interface ApiKey {
  key_id: string;
  public_key: string;
  created_at: number;
  expires_at?: number;
  permissions: string[];
}

export interface AccountMetadataResponse {
  account_index: number;
  metadata: Record<string, unknown>;
}

export interface PnLResponse {
  account_index: number;
  realized_pnl: string;
  unrealized_pnl: string;
  total_pnl: string;
  pnl_history: PnLEntry[];
}

export interface PnLEntry {
  timestamp: number;
  realized_pnl: string;
  unrealized_pnl: string;
  total_pnl: string;
}

export interface L1MetadataResponse {
  l1_address: string;
  total_accounts: number;
  total_volume: string;
  total_trades: number;
}

export interface LiquidationsResponse {
  liquidations: Liquidation[];
  total: number;
}

export interface Liquidation {
  liquidation_id: string;
  account_index: number;
  market_id: number;
  liquidated_size: string;
  liquidation_price: string;
  timestamp: number;
  liquidator?: number;
}

export interface PositionFundingResponse {
  account_index: number;
  fundings: FundingEntry[];
}

export interface FundingEntry {
  market_id: number;
  timestamp: number;
  funding_rate: string;
  funding_payment: string;
  position_size: string;
}

export interface PublicPoolsMetadataResponse {
  pools: PoolMetadata[];
}

export interface PoolMetadata {
  pool_id: string;
  name: string;
  total_value_locked: string;
  apy: string;
  tokens: string[];
}
