import { HttpClient } from '../client/http-client';
import { StatusResponse, InfoResponse } from '../types';

export class RootApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async getStatus(): Promise<StatusResponse> {
    return this.client.get<StatusResponse>(`${this.basePath}/status`);
  }

  async getInfo(): Promise<InfoResponse> {
    return this.client.get<InfoResponse>(`${this.basePath}/info`);
  }
}
