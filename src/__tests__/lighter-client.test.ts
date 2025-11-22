import nock from 'nock';
import { LighterClient, DEFAULT_BASE_URLS } from '../lighter-client';

describe('LighterClient', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor', () => {
    it('should use mainnet by default', () => {
      const client = new LighterClient();
      expect(client.root).toBeDefined();
      expect(client.account).toBeDefined();
      expect(client.order).toBeDefined();
      expect(client.transaction).toBeDefined();
      expect(client.market).toBeDefined();
      expect(client.explorer).toBeDefined();
    });

    it('should use staging network', () => {
      const client = new LighterClient({ network: 'staging' });
      expect(client.root).toBeDefined();
    });

    it('should use custom base URL', () => {
      const client = new LighterClient({ baseURL: 'https://custom.api.com' });
      expect(client.root).toBeDefined();
    });
  });

  describe('API clients', () => {
    it('should have all API clients initialized', () => {
      const client = new LighterClient();
      expect(client.root).toBeDefined();
      expect(client.account).toBeDefined();
      expect(client.order).toBeDefined();
      expect(client.transaction).toBeDefined();
      expect(client.market).toBeDefined();
      expect(client.explorer).toBeDefined();
    });
  });

  describe('createSignerClient', () => {
    it('should create signer client', () => {
      const client = new LighterClient();
      const privateKey =
        '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
      const signerClient = client.createSignerClient(privateKey, 1);

      expect(signerClient).toBeDefined();
      expect(signerClient.getAccountIndex()).toBe(1);
    });
  });

  describe('authentication', () => {
    it('should set auth token', async () => {
      const client = new LighterClient({ network: 'mainnet' });
      client.setAuthToken('test-token');

      nock(DEFAULT_BASE_URLS.mainnet)
        .get('/api/v1/status')
        .matchHeader('Authorization', 'Bearer test-token')
        .reply(200, { status: 'ok' });

      await client.root.getStatus();
    });

    it('should remove auth token', async () => {
      const client = new LighterClient({ network: 'mainnet' });
      client.setAuthToken('test-token');
      client.removeAuthToken();

      nock(DEFAULT_BASE_URLS.mainnet)
        .get('/api/v1/status')
        .reply(200, function () {
          expect(this.req.headers.authorization).toBeUndefined();
          return { status: 'ok' };
        });

      await client.root.getStatus();
    });
  });

  describe('integration', () => {
    it('should fetch status using root API', async () => {
      const client = new LighterClient({ network: 'mainnet' });

      const mockStatus = {
        status: 'operational',
        version: '1.0.0',
        timestamp: Date.now(),
      };

      nock(DEFAULT_BASE_URLS.mainnet).get('/api/v1/status').reply(200, mockStatus);

      const result = await client.root.getStatus();
      expect(result).toEqual(mockStatus);
    });

    it('should fetch account using account API', async () => {
      const client = new LighterClient({ network: 'mainnet' });

      const mockAccount = {
        account_index: 1,
        l1_address: '0x123',
        status: 1 as const,
        collateral: '10000',
        positions: [],
      };

      nock(DEFAULT_BASE_URLS.mainnet)
        .get('/api/v1/account')
        .query({ account_index: 1 })
        .reply(200, mockAccount);

      const result = await client.account.getAccount({ account_index: 1 });
      expect(result).toEqual(mockAccount);
    });
  });
});
