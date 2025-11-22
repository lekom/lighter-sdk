import { HttpClient } from '../client/http-client';
import {
  AccountRequest,
  AccountResponse,
  AccountsByL1AddressRequest,
  AccountsByL1AddressResponse,
  AccountLimitsRequest,
  AccountLimitsResponse,
  ApiKeysResponse,
  AccountMetadataRequest,
  AccountMetadataResponse,
  PnLRequest,
  PnLResponse,
  L1MetadataRequest,
  L1MetadataResponse,
  ChangeAccountTierRequest,
  LiquidationsRequest,
  LiquidationsResponse,
  PositionFundingRequest,
  PositionFundingResponse,
  PublicPoolsMetadataResponse,
} from '../types';

export class AccountApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async getAccount(params: AccountRequest): Promise<AccountResponse> {
    return this.client.get<AccountResponse>(`${this.basePath}/account`, {
      params,
    });
  }

  async getAccountsByL1Address(
    params: AccountsByL1AddressRequest
  ): Promise<AccountsByL1AddressResponse> {
    return this.client.get<AccountsByL1AddressResponse>(
      `${this.basePath}/accountsByL1Address`,
      { params }
    );
  }

  async getAccountLimits(params: AccountLimitsRequest): Promise<AccountLimitsResponse> {
    return this.client.get<AccountLimitsResponse>(`${this.basePath}/accountLimits`, {
      params,
    });
  }

  async getApiKeys(): Promise<ApiKeysResponse> {
    return this.client.get<ApiKeysResponse>(`${this.basePath}/apikeys`);
  }

  async getAccountMetadata(
    params: AccountMetadataRequest
  ): Promise<AccountMetadataResponse> {
    return this.client.get<AccountMetadataResponse>(`${this.basePath}/accountMetadata`, {
      params,
    });
  }

  async getPnL(params: PnLRequest): Promise<PnLResponse> {
    return this.client.get<PnLResponse>(`${this.basePath}/pnl`, {
      params,
    });
  }

  async getL1Metadata(params: L1MetadataRequest): Promise<L1MetadataResponse> {
    return this.client.get<L1MetadataResponse>(`${this.basePath}/l1Metadata`, {
      params,
    });
  }

  async changeAccountTier(request: ChangeAccountTierRequest): Promise<void> {
    return this.client.post<void>(`${this.basePath}/changeAccountTier`, request);
  }

  async getLiquidations(params: LiquidationsRequest): Promise<LiquidationsResponse> {
    return this.client.get<LiquidationsResponse>(`${this.basePath}/liquidations`, {
      params,
    });
  }

  async getPositionFunding(
    params: PositionFundingRequest
  ): Promise<PositionFundingResponse> {
    return this.client.get<PositionFundingResponse>(`${this.basePath}/positionFunding`, {
      params,
    });
  }

  async getPublicPoolsMetadata(): Promise<PublicPoolsMetadataResponse> {
    return this.client.get<PublicPoolsMetadataResponse>(
      `${this.basePath}/publicPoolsMetadata`
    );
  }
}
