import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '../types';

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

export class HttpClient {
  private axios: AxiosInstance;
  private retries: number;
  private retryDelay: number;

  constructor(config: HttpClientConfig) {
    this.retries = config.retries ?? 3;
    this.retryDelay = config.retryDelay ?? 1000;

    this.axios = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (this.shouldRetry(error)) {
          return this.retryRequest(error);
        }
        throw this.handleError(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.config || error.config.headers?.['X-Retry-Count'] >= this.retries) {
      return false;
    }

    const status = error.response?.status;
    const retryableStatuses = [408, 429, 500, 502, 503, 504];

    return !status || retryableStatuses.includes(status);
  }

  private async retryRequest(error: AxiosError): Promise<AxiosResponse> {
    const config = error.config as AxiosRequestConfig & { headers: Record<string, unknown> };
    const retryCount = (config.headers['X-Retry-Count'] as number) || 0;

    await this.delay(this.retryDelay * Math.pow(2, retryCount));

    config.headers['X-Retry-Count'] = retryCount + 1;

    return this.axios.request(config);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      return {
        code: data.code as string || `HTTP_${error.response.status}`,
        message: data.message as string || error.message,
        details: data,
      };
    } else if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'No response received from server',
        details: error.message,
      };
    } else {
      return {
        code: 'REQUEST_ERROR',
        message: error.message,
        details: error,
      };
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.delete<T>(url, config);
    return response.data;
  }

  setHeader(key: string, value: string): void {
    this.axios.defaults.headers.common[key] = value;
  }

  removeHeader(key: string): void {
    delete this.axios.defaults.headers.common[key];
  }
}
