import nock from 'nock';
import { SignerClient } from '../signer-client';

describe('SignerClient', () => {
  const baseURL = 'https://api.test.com';
  const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  const accountIndex = 1;
  let client: SignerClient;

  beforeEach(() => {
    client = new SignerClient({ baseURL, privateKey, accountIndex });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getAddress', () => {
    it('should return wallet address', () => {
      const address = client.getAddress();
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });

  describe('getAccountIndex', () => {
    it('should return account index', () => {
      expect(client.getAccountIndex()).toBe(accountIndex);
    });
  });

  describe('syncNonce', () => {
    it('should sync nonce from API', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 5 });

      const nonce = await client.syncNonce();
      expect(nonce).toBe(5);
    });
  });

  describe('createOrder', () => {
    it('should create and send order transaction', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 1 });

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL)
        .post('/api/v1/sendTx', (body) => {
          return (
            body.tx_type === 'create_order' &&
            body.account_index === accountIndex &&
            body.signature !== undefined
          );
        })
        .reply(200, mockResponse);

      const result = await client.createOrder({
        market_id: 1,
        side: 'buy',
        type: 'limit',
        time_in_force: 'gtc',
        price: '50000',
        size: '1',
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel order', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 2 });

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL)
        .post('/api/v1/sendTx', (body) => {
          return body.tx_type === 'cancel_order' && body.signature !== undefined;
        })
        .reply(200, mockResponse);

      const result = await client.cancelOrder({
        order_nonce: 1,
        market_id: 1,
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('deposit', () => {
    it('should create deposit transaction', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 3 });

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL)
        .post('/api/v1/sendTx', (body) => {
          return body.tx_type === 'deposit' && body.signature !== undefined;
        })
        .reply(200, mockResponse);

      const result = await client.deposit({
        amount: '1000',
        token: 'USDC',
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('withdraw', () => {
    it('should create withdraw transaction', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 4 });

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL)
        .post('/api/v1/sendTx', (body) => {
          return body.tx_type === 'withdraw' && body.signature !== undefined;
        })
        .reply(200, mockResponse);

      const result = await client.withdraw({
        amount: '500',
        token: 'USDC',
        recipient: '0x123',
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('transfer', () => {
    it('should create transfer transaction', async () => {
      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: accountIndex })
        .reply(200, { account_index: accountIndex, next_nonce: 5 });

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL)
        .post('/api/v1/sendTx', (body) => {
          return body.tx_type === 'transfer' && body.signature !== undefined;
        })
        .reply(200, mockResponse);

      const result = await client.transfer({
        amount: '100',
        token: 'USDC',
        to_account_index: 2,
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
