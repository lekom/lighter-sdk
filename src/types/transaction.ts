import { OrderSide, OrderType, TimeInForce } from './common';

export interface SendTxRequest {
  tx_type: string;
  account_index: number;
  payload: TransactionPayload;
  signature: string;
  nonce: number;
}

export interface SendTxBatchRequest {
  transactions: SendTxRequest[];
}

export interface TransactionPayload {
  [key: string]: unknown;
}

export interface CreateOrderPayload extends TransactionPayload {
  market_id: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: TimeInForce;
  price: string;
  size: string;
  client_order_id?: string;
}

export interface CancelOrderPayload extends TransactionPayload {
  order_nonce: number;
  market_id: number;
}

export interface DepositPayload extends TransactionPayload {
  amount: string;
  token: string;
}

export interface WithdrawPayload extends TransactionPayload {
  amount: string;
  token: string;
  recipient: string;
}

export interface TransferPayload extends TransactionPayload {
  amount: string;
  token: string;
  to_account_index: number;
}

export interface SendTxResponse {
  tx_hash: string;
  status: string;
  timestamp: number;
}

export interface SendTxBatchResponse {
  batch_id: string;
  transactions: SendTxResponse[];
  failed?: number[];
}

export interface TxRequest {
  tx_hash: string;
}

export interface TxsRequest {
  account_index?: number;
  tx_type?: string;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface LogsRequest {
  account_index?: number;
  market_id?: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface BlockTxsRequest {
  block_number: number;
}

export interface DepositHistoryRequest {
  account_index: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface WithdrawHistoryRequest {
  account_index: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface TransferHistoryRequest {
  account_index: number;
  start_time?: number;
  end_time?: number;
  limit?: number;
  offset?: number;
}

export interface NextNonceRequest {
  account_index: number;
}

export interface TransactionResponse {
  tx_hash: string;
  tx_type: string;
  account_index: number;
  block_number: number;
  timestamp: number;
  status: string;
  payload: TransactionPayload;
  signature: string;
  nonce: number;
  gas_used?: string;
  error?: string;
}

export interface TxsResponse {
  transactions: TransactionResponse[];
  total: number;
}

export interface LogEntry {
  log_id: string;
  tx_hash: string;
  account_index: number;
  market_id?: number;
  event_type: string;
  data: Record<string, unknown>;
  timestamp: number;
  block_number: number;
}

export interface LogsResponse {
  logs: LogEntry[];
  total: number;
}

export interface BlockTxsResponse {
  block_number: number;
  transactions: TransactionResponse[];
  total: number;
}

export interface DepositEntry {
  deposit_id: string;
  account_index: number;
  amount: string;
  token: string;
  tx_hash: string;
  l1_tx_hash?: string;
  status: string;
  timestamp: number;
  confirmed_at?: number;
}

export interface DepositHistoryResponse {
  deposits: DepositEntry[];
  total: number;
}

export interface WithdrawEntry {
  withdraw_id: string;
  account_index: number;
  amount: string;
  token: string;
  recipient: string;
  tx_hash: string;
  l1_tx_hash?: string;
  status: string;
  timestamp: number;
  confirmed_at?: number;
}

export interface WithdrawHistoryResponse {
  withdrawals: WithdrawEntry[];
  total: number;
}

export interface TransferEntry {
  transfer_id: string;
  from_account_index: number;
  to_account_index: number;
  amount: string;
  token: string;
  tx_hash: string;
  timestamp: number;
}

export interface TransferHistoryResponse {
  transfers: TransferEntry[];
  total: number;
}

export interface NextNonceResponse {
  account_index: number;
  next_nonce: number;
}
