import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { ExplorerApi } from '../explorer-api';

describe('ExplorerApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: ExplorerApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new ExplorerApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getAccountLogs', () => {
    it('should fetch account logs', async () => {
      const mockLogs = {
        account_index: 1,
        logs: [
          {
            log_id: 'log-1',
            event_type: 'order_created',
            data: { order_id: 'order-1' },
            timestamp: Date.now(),
            block_number: 12345,
            tx_hash: '0xtx',
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/explorer/account/logs')
        .query({ account_index: 1 })
        .reply(200, mockLogs);

      const result = await api.getAccountLogs({ account_index: 1 });
      expect(result).toEqual(mockLogs);
    });
  });

  describe('getBlocks', () => {
    it('should fetch blocks', async () => {
      const mockBlocks = {
        blocks: [
          {
            block_number: 12345,
            block_hash: '0xblockhash',
            parent_hash: '0xparenthash',
            timestamp: Date.now(),
            num_transactions: 10,
            num_batches: 2,
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/explorer/blocks')
        .query({ limit: 10 })
        .reply(200, mockBlocks);

      const result = await api.getBlocks({ limit: 10 });
      expect(result).toEqual(mockBlocks);
    });
  });

  describe('getBlock', () => {
    it('should fetch single block', async () => {
      const mockBlock = {
        block_number: 12345,
        block_hash: '0xblockhash',
        parent_hash: '0xparenthash',
        timestamp: Date.now(),
        transactions: ['0xtx1', '0xtx2'],
        batches: ['batch-1'],
        state_root: '0xstateroot',
      };

      nock(baseURL)
        .get('/api/v1/explorer/block')
        .query({ block_number: 12345 })
        .reply(200, mockBlock);

      const result = await api.getBlock({ block_number: 12345 });
      expect(result).toEqual(mockBlock);
    });
  });

  describe('getMarkets', () => {
    it('should fetch markets', async () => {
      const mockMarkets = {
        markets: [
          {
            market_id: 1,
            symbol: 'BTC-USD',
            base_token: 'BTC',
            quote_token: 'USD',
            current_price: '50000',
            volume_24h: '1000000',
            high_24h: '51000',
            low_24h: '49000',
            price_change_24h: '1000',
            num_trades_24h: 5000,
            status: 'active',
          },
        ],
      };

      nock(baseURL).get('/api/v1/explorer/markets').reply(200, mockMarkets);

      const result = await api.getMarkets();
      expect(result).toEqual(mockMarkets);
    });
  });

  describe('search', () => {
    it('should search across types', async () => {
      const mockResults = {
        results: [
          {
            type: 'account' as const,
            id: '1',
            data: { account_index: 1 },
            relevance_score: 0.95,
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/explorer/search')
        .query({ query: 'test' })
        .reply(200, mockResults);

      const result = await api.search({ query: 'test' });
      expect(result).toEqual(mockResults);
    });
  });

  describe('getStats', () => {
    it('should fetch explorer stats', async () => {
      const mockStats = {
        period: '24h',
        total_accounts: 1000,
        total_transactions: 50000,
        total_volume: '10000000',
        total_trades: 25000,
        active_accounts: 500,
        new_accounts: 50,
        average_block_time: 2,
        total_blocks: 12345,
      };

      nock(baseURL)
        .get('/api/v1/explorer/stats')
        .query({ period: '24h' })
        .reply(200, mockStats);

      const result = await api.getStats({ period: '24h' });
      expect(result).toEqual(mockStats);
    });
  });

  describe('getAccountPositions', () => {
    it('should fetch account positions', async () => {
      const mockPositions = {
        account_index: 1,
        positions: [],
      };

      nock(baseURL)
        .get('/api/v1/explorer/account/positions')
        .query({ account_index: 1 })
        .reply(200, mockPositions);

      const result = await api.getAccountPositions({ account_index: 1 });
      expect(result).toEqual(mockPositions);
    });
  });

  describe('getBatches', () => {
    it('should fetch batches', async () => {
      const mockBatches = {
        batches: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/explorer/batches')
        .query({ limit: 10 })
        .reply(200, mockBatches);

      const result = await api.getBatches({ limit: 10 });
      expect(result).toEqual(mockBatches);
    });
  });

  describe('getBatch', () => {
    it('should fetch single batch', async () => {
      const mockBatch = {
        batch_id: 'batch-1',
        block_number: 12345,
        transactions: [],
        timestamp: Date.now(),
        status: 'confirmed',
      };

      nock(baseURL)
        .get('/api/v1/explorer/batch')
        .query({ batch_id: 'batch-1' })
        .reply(200, mockBatch);

      const result = await api.getBatch({ batch_id: 'batch-1' });
      expect(result).toEqual(mockBatch);
    });
  });
});
