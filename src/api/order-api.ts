import { HttpClient } from '../client/http-client';
import {
  AccountActiveOrdersRequest,
  AccountActiveOrdersResponse,
  AccountInactiveOrdersRequest,
  AccountInactiveOrdersResponse,
  OrderBooksRequest,
  OrderBooksResponse,
  OrderBookDetailsRequest,
  OrderBookDetailsResponse,
  OrderBookOrdersRequest,
  OrderBookOrdersResponse,
  RecentTradesRequest,
  RecentTradesResponse,
  TradesRequest,
  TradesResponse,
  ExchangeStatsRequest,
  ExchangeStatsResponse,
  ExportRequest,
  ExportResponse,
} from '../types';

export class OrderApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async getAccountActiveOrders(
    params: AccountActiveOrdersRequest
  ): Promise<AccountActiveOrdersResponse> {
    return this.client.get<AccountActiveOrdersResponse>(
      `${this.basePath}/accountActiveOrders`,
      { params }
    );
  }

  async getAccountInactiveOrders(
    params: AccountInactiveOrdersRequest
  ): Promise<AccountInactiveOrdersResponse> {
    return this.client.get<AccountInactiveOrdersResponse>(
      `${this.basePath}/accountInactiveOrders`,
      { params }
    );
  }

  async getOrderBooks(params?: OrderBooksRequest): Promise<OrderBooksResponse> {
    return this.client.get<OrderBooksResponse>(`${this.basePath}/orderBooks`, {
      params,
    });
  }

  async getOrderBookDetails(
    params: OrderBookDetailsRequest
  ): Promise<OrderBookDetailsResponse> {
    return this.client.get<OrderBookDetailsResponse>(
      `${this.basePath}/orderBookDetails`,
      { params }
    );
  }

  async getOrderBookOrders(
    params: OrderBookOrdersRequest
  ): Promise<OrderBookOrdersResponse> {
    return this.client.get<OrderBookOrdersResponse>(
      `${this.basePath}/orderBookOrders`,
      { params }
    );
  }

  async getRecentTrades(params: RecentTradesRequest): Promise<RecentTradesResponse> {
    return this.client.get<RecentTradesResponse>(`${this.basePath}/recentTrades`, {
      params,
    });
  }

  async getTrades(params?: TradesRequest): Promise<TradesResponse> {
    return this.client.get<TradesResponse>(`${this.basePath}/trades`, {
      params,
    });
  }

  async getExchangeStats(params?: ExchangeStatsRequest): Promise<ExchangeStatsResponse> {
    return this.client.get<ExchangeStatsResponse>(`${this.basePath}/exchangeStats`, {
      params,
    });
  }

  async exportData(params: ExportRequest): Promise<ExportResponse> {
    return this.client.get<ExportResponse>(`${this.basePath}/export`, {
      params,
    });
  }
}
