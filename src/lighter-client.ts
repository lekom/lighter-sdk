import { HttpClient, HttpClientConfig } from './client/http-client';
import { RootApi } from './api/root-api';
import { AccountApi } from './api/account-api';
import { OrderApi } from './api/order-api';
import { TransactionApi } from './api/transaction-api';
import { MarketApi } from './api/market-api';
import { ExplorerApi } from './api/explorer-api';
import { SignerClient } from './signer/signer-client';

export interface LighterClientConfig extends Partial<HttpClientConfig> {
  baseURL?: string;
  network?: 'mainnet' | 'staging';
}

export const DEFAULT_BASE_URLS = {
  mainnet: 'https://mainnet.zklighter.elliot.ai',
  staging: 'https://staging.zklighter.elliot.ai',
};

export class LighterClient {
  public readonly root: RootApi;
  public readonly account: AccountApi;
  public readonly order: OrderApi;
  public readonly transaction: TransactionApi;
  public readonly market: MarketApi;
  public readonly explorer: ExplorerApi;

  private httpClient: HttpClient;

  constructor(config: LighterClientConfig = {}) {
    const baseURL =
      config.baseURL || DEFAULT_BASE_URLS[config.network || 'mainnet'];

    this.httpClient = new HttpClient({
      baseURL,
      timeout: config.timeout,
      headers: config.headers,
      retries: config.retries,
      retryDelay: config.retryDelay,
    });

    this.root = new RootApi(this.httpClient);
    this.account = new AccountApi(this.httpClient);
    this.order = new OrderApi(this.httpClient);
    this.transaction = new TransactionApi(this.httpClient);
    this.market = new MarketApi(this.httpClient);
    this.explorer = new ExplorerApi(this.httpClient);
  }

  createSignerClient(
    privateKey: string,
    accountIndex: number,
    chainId?: number
  ): SignerClient {
    const baseURL = this.httpClient['axios'].defaults.baseURL as string;
    return new SignerClient({
      baseURL,
      privateKey,
      accountIndex,
      chainId,
    });
  }

  setAuthToken(token: string): void {
    this.httpClient.setHeader('Authorization', `Bearer ${token}`);
  }

  removeAuthToken(): void {
    this.httpClient.removeHeader('Authorization');
  }
}
