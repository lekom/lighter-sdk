import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { AccountApi } from '../account-api';

describe('AccountApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: AccountApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new AccountApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getAccount', () => {
    it('should fetch account successfully', async () => {
      const mockAccount = {
        account_index: 1,
        l1_address: '0x123',
        status: 1 as const,
        collateral: '10000',
        positions: [],
        created_at: Date.now(),
      };

      nock(baseURL)
        .get('/api/v1/account')
        .query({ by: 'account_index', account_index: 1 })
        .reply(200, mockAccount);

      const result = await api.getAccount({ account_index: 1 });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('getAccountsByL1Address', () => {
    it('should fetch accounts by L1 address', async () => {
      const mockResponse = {
        l1_address: '0x123',
        accounts: [
          { account_index: 1, status: 1 as const, created_at: Date.now() },
          { account_index: 2, status: 1 as const, created_at: Date.now() },
        ],
      };

      nock(baseURL)
        .get('/api/v1/accountsByL1Address')
        .query({ l1_address: '0x123' })
        .reply(200, mockResponse);

      const result = await api.getAccountsByL1Address({ l1_address: '0x123' });
      expect(result).toEqual(mockResponse);
      expect(result.accounts).toHaveLength(2);
    });
  });

  describe('getAccountLimits', () => {
    it('should fetch account limits', async () => {
      const mockLimits = {
        account_index: 1,
        max_leverage: '10',
        max_position_size: '100000',
        max_order_size: '50000',
        tier: 2,
      };

      nock(baseURL)
        .get('/api/v1/accountLimits')
        .query({ account_index: 1 })
        .reply(200, mockLimits);

      const result = await api.getAccountLimits({ account_index: 1 });
      expect(result).toEqual(mockLimits);
    });
  });

  describe('getPnL', () => {
    it('should fetch PnL data', async () => {
      const mockPnL = {
        account_index: 1,
        realized_pnl: '1000',
        unrealized_pnl: '500',
        total_pnl: '1500',
        pnl_history: [
          {
            timestamp: Date.now(),
            realized_pnl: '1000',
            unrealized_pnl: '500',
            total_pnl: '1500',
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/pnl')
        .query({ by: 'account_index', account_index: 1 })
        .reply(200, mockPnL);

      const result = await api.getPnL({ account_index: 1 });
      expect(result).toEqual(mockPnL);
    });
  });

  describe('getLiquidations', () => {
    it('should fetch liquidations', async () => {
      const mockLiquidations = {
        liquidations: [
          {
            liquidation_id: 'liq-1',
            account_index: 1,
            market_id: 1,
            liquidated_size: '100',
            liquidation_price: '50000',
            timestamp: Date.now(),
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/liquidations')
        .query({ account_index: 1 })
        .reply(200, mockLiquidations);

      const result = await api.getLiquidations({ account_index: 1 });
      expect(result).toEqual(mockLiquidations);
    });
  });

  describe('changeAccountTier', () => {
    it('should change account tier', async () => {
      const request = {
        account_index: 1,
        tier: 3,
        signature: '0xsignature',
      };

      nock(baseURL).post('/api/v1/changeAccountTier', request).reply(200);

      await api.changeAccountTier(request);
    });
  });

  describe('getApiKeys', () => {
    it('should fetch API keys', async () => {
      const mockKeys = {
        keys: [
          {
            key_id: 'key-1',
            public_key: '0xpublic',
            created_at: Date.now(),
            permissions: ['read', 'trade'],
          },
        ],
      };

      nock(baseURL).get('/api/v1/apikeys').reply(200, mockKeys);

      const result = await api.getApiKeys();
      expect(result).toEqual(mockKeys);
    });
  });

  describe('getAccountMetadata', () => {
    it('should fetch account metadata', async () => {
      const mockMetadata = {
        account_index: 1,
        metadata: { custom: 'data' },
      };

      nock(baseURL)
        .get('/api/v1/accountMetadata')
        .query({ by: 'account_index', account_index: 1 })
        .reply(200, mockMetadata);

      const result = await api.getAccountMetadata({ account_index: 1 });
      expect(result).toEqual(mockMetadata);
    });
  });

  describe('getL1Metadata', () => {
    it('should fetch L1 metadata', async () => {
      const mockMetadata = {
        l1_address: '0x123',
        total_accounts: 5,
        total_volume: '1000000',
        total_trades: 500,
      };

      nock(baseURL)
        .get('/api/v1/l1Metadata')
        .query({ l1_address: '0x123' })
        .reply(200, mockMetadata);

      const result = await api.getL1Metadata({ l1_address: '0x123' });
      expect(result).toEqual(mockMetadata);
    });
  });

  describe('getPositionFunding', () => {
    it('should fetch position funding', async () => {
      const mockFunding = {
        account_index: 1,
        fundings: [
          {
            market_id: 1,
            timestamp: Date.now(),
            funding_rate: '0.01',
            funding_payment: '10',
            position_size: '100',
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/positionFunding')
        .query({ account_index: 1, market_id: 1 })
        .reply(200, mockFunding);

      const result = await api.getPositionFunding({ account_index: 1, market_id: 1 });
      expect(result).toEqual(mockFunding);
    });
  });

  describe('getPublicPoolsMetadata', () => {
    it('should fetch public pools metadata', async () => {
      const mockPools = {
        pools: [
          {
            pool_id: 'pool-1',
            name: 'Test Pool',
            total_value_locked: '1000000',
            apy: '15.5',
            tokens: ['USDC', 'ETH'],
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/publicPoolsMetadata')
        .query({ index: '0' })
        .reply(200, mockPools);

      const result = await api.getPublicPoolsMetadata();
      expect(result).toEqual(mockPools);
    });
  });
});
