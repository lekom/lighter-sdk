import { OrderSide, OrderType, TimeInForce } from '../types';

export interface CreateOrderParams {
  market_id: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: TimeInForce;
  price: string;
  size: string;
  client_order_id?: string;
}

export interface CancelOrderParams {
  order_nonce: number;
  market_id: number;
}

export interface DepositParams {
  amount: string;
  token: string;
}

export interface WithdrawParams {
  amount: string;
  token: string;
  recipient: string;
}

export interface TransferParams {
  amount: string;
  token: string;
  to_account_index: number;
}

export interface SignableTransaction {
  tx_type: string;
  account_index: number;
  payload: Record<string, unknown>;
  nonce: number;
}

export interface SignedTransaction extends SignableTransaction {
  signature: string;
}
