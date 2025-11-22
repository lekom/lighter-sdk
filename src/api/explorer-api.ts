import { HttpClient } from '../client/http-client';
import {
  ExplorerAccountLogsRequest,
  ExplorerAccountLogsResponse,
  ExplorerAccountPositionsRequest,
  ExplorerAccountPositionsResponse,
  ExplorerBatchesRequest,
  ExplorerBatchesResponse,
  ExplorerBatchRequest,
  ExplorerBatchResponse,
  ExplorerBlocksRequest,
  ExplorerBlocksResponse,
  ExplorerBlockRequest,
  ExplorerBlockResponse,
  ExplorerMarketsRequest,
  ExplorerMarketsResponse,
  ExplorerSearchRequest,
  ExplorerSearchResponse,
  ExplorerStatsRequest,
  ExplorerStatsResponse,
} from '../types';

export class ExplorerApi {
  private readonly basePath = '/api/v1/explorer';

  constructor(private client: HttpClient) {}

  async getAccountLogs(
    params: ExplorerAccountLogsRequest
  ): Promise<ExplorerAccountLogsResponse> {
    return this.client.get<ExplorerAccountLogsResponse>(
      `${this.basePath}/account/logs`,
      { params }
    );
  }

  async getAccountPositions(
    params: ExplorerAccountPositionsRequest
  ): Promise<ExplorerAccountPositionsResponse> {
    return this.client.get<ExplorerAccountPositionsResponse>(
      `${this.basePath}/account/positions`,
      { params }
    );
  }

  async getBatches(params?: ExplorerBatchesRequest): Promise<ExplorerBatchesResponse> {
    return this.client.get<ExplorerBatchesResponse>(`${this.basePath}/batches`, {
      params,
    });
  }

  async getBatch(params: ExplorerBatchRequest): Promise<ExplorerBatchResponse> {
    return this.client.get<ExplorerBatchResponse>(`${this.basePath}/batch`, {
      params,
    });
  }

  async getBlocks(params?: ExplorerBlocksRequest): Promise<ExplorerBlocksResponse> {
    return this.client.get<ExplorerBlocksResponse>(`${this.basePath}/blocks`, {
      params,
    });
  }

  async getBlock(params: ExplorerBlockRequest): Promise<ExplorerBlockResponse> {
    return this.client.get<ExplorerBlockResponse>(`${this.basePath}/block`, {
      params,
    });
  }

  async getMarkets(params?: ExplorerMarketsRequest): Promise<ExplorerMarketsResponse> {
    return this.client.get<ExplorerMarketsResponse>(`${this.basePath}/markets`, {
      params,
    });
  }

  async search(params: ExplorerSearchRequest): Promise<ExplorerSearchResponse> {
    return this.client.get<ExplorerSearchResponse>(`${this.basePath}/search`, {
      params,
    });
  }

  async getStats(params?: ExplorerStatsRequest): Promise<ExplorerStatsResponse> {
    return this.client.get<ExplorerStatsResponse>(`${this.basePath}/stats`, {
      params,
    });
  }
}
