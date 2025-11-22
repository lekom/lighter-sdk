import { HttpClient } from '../client/http-client';
import {
  SendTxRequest,
  SendTxResponse,
  SendTxBatchRequest,
  SendTxBatchResponse,
  TxRequest,
  TransactionResponse,
  TxsRequest,
  TxsResponse,
  LogsRequest,
  LogsResponse,
  BlockTxsRequest,
  BlockTxsResponse,
  DepositHistoryRequest,
  DepositHistoryResponse,
  WithdrawHistoryRequest,
  WithdrawHistoryResponse,
  TransferHistoryRequest,
  TransferHistoryResponse,
  NextNonceRequest,
  NextNonceResponse,
} from '../types';

export class TransactionApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async sendTransaction(request: SendTxRequest): Promise<SendTxResponse> {
    return this.client.post<SendTxResponse>(`${this.basePath}/sendTx`, request);
  }

  async sendTransactionBatch(request: SendTxBatchRequest): Promise<SendTxBatchResponse> {
    return this.client.post<SendTxBatchResponse>(`${this.basePath}/sendTxBatch`, request);
  }

  async getTransaction(params: TxRequest): Promise<TransactionResponse> {
    return this.client.get<TransactionResponse>(`${this.basePath}/tx`, {
      params,
    });
  }

  async getTransactions(params?: TxsRequest): Promise<TxsResponse> {
    return this.client.get<TxsResponse>(`${this.basePath}/txs`, {
      params,
    });
  }

  async getLogs(params?: LogsRequest): Promise<LogsResponse> {
    return this.client.get<LogsResponse>(`${this.basePath}/logs`, {
      params,
    });
  }

  async getBlockTransactions(params: BlockTxsRequest): Promise<BlockTxsResponse> {
    return this.client.get<BlockTxsResponse>(`${this.basePath}/blockTxs`, {
      params,
    });
  }

  async getDepositHistory(
    params: DepositHistoryRequest
  ): Promise<DepositHistoryResponse> {
    return this.client.get<DepositHistoryResponse>(`${this.basePath}/deposit_history`, {
      params,
    });
  }

  async getWithdrawHistory(
    params: WithdrawHistoryRequest
  ): Promise<WithdrawHistoryResponse> {
    return this.client.get<WithdrawHistoryResponse>(`${this.basePath}/withdraw_history`, {
      params,
    });
  }

  async getTransferHistory(
    params: TransferHistoryRequest
  ): Promise<TransferHistoryResponse> {
    return this.client.get<TransferHistoryResponse>(`${this.basePath}/transfer_history`, {
      params,
    });
  }

  async getNextNonce(params: NextNonceRequest): Promise<NextNonceResponse> {
    return this.client.get<NextNonceResponse>(`${this.basePath}/nextNonce`, {
      params,
    });
  }
}
