import { HttpClient } from '../client/http-client';
import {
  CandlesticksRequest,
  CandlesticksResponse,
  FundingsRequest,
  FundingsResponse,
  FundingRatesRequest,
  FundingRatesResponse,
  FastBridgeInfoRequest,
  FastBridgeInfoResponse,
} from '../types';

export class MarketApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async getCandlesticks(params: CandlesticksRequest): Promise<CandlesticksResponse> {
    return this.client.get<CandlesticksResponse>(`${this.basePath}/candlesticks`, {
      params,
    });
  }

  async getFundings(params: FundingsRequest): Promise<FundingsResponse> {
    return this.client.get<FundingsResponse>(`${this.basePath}/fundings`, {
      params,
    });
  }

  async getFundingRates(params?: FundingRatesRequest): Promise<FundingRatesResponse> {
    return this.client.get<FundingRatesResponse>(`${this.basePath}/funding-rates`, {
      params,
    });
  }

  async getFastBridgeInfo(
    params?: FastBridgeInfoRequest
  ): Promise<FastBridgeInfoResponse> {
    return this.client.get<FastBridgeInfoResponse>(`${this.basePath}/fastbridge_info`, {
      params,
    });
  }
}
