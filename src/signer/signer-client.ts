import { HttpClient } from '../client/http-client';
import { TransactionApi } from '../api/transaction-api';
import { TransactionSigner } from './signer';
import {
  CreateOrderParams,
  CancelOrderParams,
  DepositParams,
  WithdrawParams,
  TransferParams,
  SignableTransaction,
} from './types';
import { SendTxResponse } from '../types';

export interface SignerClientConfig {
  baseURL: string;
  privateKey: string;
  accountIndex: number;
  chainId?: number;
  timeout?: number;
}

export class SignerClient {
  private httpClient: HttpClient;
  private transactionApi: TransactionApi;
  private signer: TransactionSigner;
  private accountIndex: number;
  private currentNonce: number;

  constructor(config: SignerClientConfig) {
    this.httpClient = new HttpClient({
      baseURL: config.baseURL,
      timeout: config.timeout,
    });
    this.transactionApi = new TransactionApi(this.httpClient);
    this.signer = new TransactionSigner(config.privateKey, config.chainId);
    this.accountIndex = config.accountIndex;
    this.currentNonce = 0;
  }

  getAddress(): string {
    return this.signer.getAddress();
  }

  getAccountIndex(): number {
    return this.accountIndex;
  }

  async syncNonce(): Promise<number> {
    const response = await this.transactionApi.getNextNonce({
      account_index: this.accountIndex,
    });
    this.currentNonce = response.next_nonce;
    return this.currentNonce;
  }

  private async getNextNonce(): Promise<number> {
    if (this.currentNonce === 0) {
      await this.syncNonce();
    }
    return this.currentNonce++;
  }

  async createOrder(params: CreateOrderParams): Promise<SendTxResponse> {
    const nonce = await this.getNextNonce();
    const transaction: SignableTransaction = {
      tx_type: 'create_order',
      account_index: this.accountIndex,
      payload: {
        market_id: params.market_id,
        side: params.side,
        type: params.type,
        time_in_force: params.time_in_force,
        price: params.price,
        size: params.size,
        client_order_id: params.client_order_id || '',
      },
      nonce,
    };

    const signedTx = await this.signer.signTransaction(transaction);
    return this.transactionApi.sendTransaction(signedTx);
  }

  async cancelOrder(params: CancelOrderParams): Promise<SendTxResponse> {
    const nonce = await this.getNextNonce();
    const transaction: SignableTransaction = {
      tx_type: 'cancel_order',
      account_index: this.accountIndex,
      payload: {
        order_nonce: params.order_nonce,
        market_id: params.market_id,
      },
      nonce,
    };

    const signedTx = await this.signer.signTransaction(transaction);
    return this.transactionApi.sendTransaction(signedTx);
  }

  async deposit(params: DepositParams): Promise<SendTxResponse> {
    const nonce = await this.getNextNonce();
    const transaction: SignableTransaction = {
      tx_type: 'deposit',
      account_index: this.accountIndex,
      payload: {
        amount: params.amount,
        token: params.token,
      },
      nonce,
    };

    const signedTx = await this.signer.signTransaction(transaction);
    return this.transactionApi.sendTransaction(signedTx);
  }

  async withdraw(params: WithdrawParams): Promise<SendTxResponse> {
    const nonce = await this.getNextNonce();
    const transaction: SignableTransaction = {
      tx_type: 'withdraw',
      account_index: this.accountIndex,
      payload: {
        amount: params.amount,
        token: params.token,
        recipient: params.recipient,
      },
      nonce,
    };

    const signedTx = await this.signer.signTransaction(transaction);
    return this.transactionApi.sendTransaction(signedTx);
  }

  async transfer(params: TransferParams): Promise<SendTxResponse> {
    const nonce = await this.getNextNonce();
    const transaction: SignableTransaction = {
      tx_type: 'transfer',
      account_index: this.accountIndex,
      payload: {
        amount: params.amount,
        token: params.token,
        to_account_index: params.to_account_index,
      },
      nonce,
    };

    const signedTx = await this.signer.signTransaction(transaction);
    return this.transactionApi.sendTransaction(signedTx);
  }

  async signMessage(message: string): Promise<string> {
    return this.signer.signMessage(message);
  }
}
