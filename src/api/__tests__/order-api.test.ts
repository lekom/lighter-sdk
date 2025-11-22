import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { OrderApi } from '../order-api';

describe('OrderApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: OrderApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new OrderApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getAccountActiveOrders', () => {
    it('should fetch active orders', async () => {
      const mockOrders = {
        orders: [
          {
            order_id: 'order-1',
            order_nonce: 1,
            account_index: 1,
            market_id: 1,
            side: 'buy' as const,
            type: 'limit' as const,
            time_in_force: 'gtc' as const,
            price: '50000',
            size: '1',
            filled_size: '0',
            remaining_size: '1',
            status: 'active' as const,
            created_at: Date.now(),
            updated_at: Date.now(),
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/accountActiveOrders')
        .query({ account_index: 1 })
        .reply(200, mockOrders);

      const result = await api.getAccountActiveOrders({ account_index: 1 });
      expect(result).toEqual(mockOrders);
      expect(result.orders).toHaveLength(1);
    });
  });

  describe('getOrderBooks', () => {
    it('should fetch all order books', async () => {
      const mockOrderBooks = {
        order_books: [
          {
            market_id: 1,
            symbol: 'BTC-USD',
            base_token: 'BTC',
            quote_token: 'USD',
            min_order_size: '0.001',
            min_order_size_base: '0.001',
            min_order_size_quote: '10',
            size_decimals: 8,
            price_decimals: 2,
            quote_decimals: 2,
            taker_fee: '0.05',
            maker_fee: '0.02',
            status: 'active',
          },
        ],
      };

      nock(baseURL).get('/api/v1/orderBooks').reply(200, mockOrderBooks);

      const result = await api.getOrderBooks();
      expect(result).toEqual(mockOrderBooks);
    });
  });

  describe('getOrderBookDetails', () => {
    it('should fetch order book details', async () => {
      const mockDetails = {
        market_id: 1,
        symbol: 'BTC-USD',
        timestamp: Date.now(),
        bids: [
          { price: '49900', size: '1.5', num_orders: 3 },
          { price: '49800', size: '2.0', num_orders: 5 },
        ],
        asks: [
          { price: '50100', size: '1.0', num_orders: 2 },
          { price: '50200', size: '1.5', num_orders: 4 },
        ],
        last_price: '50000',
        high_24h: '51000',
        low_24h: '49000',
        volume_24h: '1000',
      };

      nock(baseURL)
        .get('/api/v1/orderBookDetails')
        .query({ market_id: 1 })
        .reply(200, mockDetails);

      const result = await api.getOrderBookDetails({ market_id: 1 });
      expect(result).toEqual(mockDetails);
      expect(result.bids).toHaveLength(2);
      expect(result.asks).toHaveLength(2);
    });
  });

  describe('getRecentTrades', () => {
    it('should fetch recent trades', async () => {
      const mockTrades = {
        market_id: 1,
        trades: [
          {
            trade_id: 'trade-1',
            market_id: 1,
            price: '50000',
            size: '0.5',
            side: 'buy' as const,
            timestamp: Date.now(),
            maker_order_id: 'order-1',
            taker_order_id: 'order-2',
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/recentTrades')
        .query({ market_id: 1, limit: 10 })
        .reply(200, mockTrades);

      const result = await api.getRecentTrades({ market_id: 1, limit: 10 });
      expect(result).toEqual(mockTrades);
    });
  });

  describe('getExchangeStats', () => {
    it('should fetch exchange stats', async () => {
      const mockStats = {
        market_id: 1,
        volume_24h: '10000000',
        high_24h: '51000',
        low_24h: '49000',
        price_change_24h: '1000',
        price_change_percentage_24h: '2.0',
        num_trades_24h: 5000,
        open_interest: '5000000',
        funding_rate: '0.01',
      };

      nock(baseURL)
        .get('/api/v1/exchangeStats')
        .query({ market_id: 1 })
        .reply(200, mockStats);

      const result = await api.getExchangeStats({ market_id: 1 });
      expect(result).toEqual(mockStats);
    });
  });

  describe('getAccountInactiveOrders', () => {
    it('should fetch inactive orders', async () => {
      const mockOrders = {
        orders: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/accountInactiveOrders')
        .query({ account_index: 1 })
        .reply(200, mockOrders);

      const result = await api.getAccountInactiveOrders({ account_index: 1 });
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getOrderBookOrders', () => {
    it('should fetch order book orders', async () => {
      const mockOrders = {
        market_id: 1,
        side: 'buy' as const,
        orders: [],
      };

      nock(baseURL)
        .get('/api/v1/orderBookOrders')
        .query({ market_id: 1, side: 'buy' })
        .reply(200, mockOrders);

      const result = await api.getOrderBookOrders({ market_id: 1, side: 'buy' });
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getTrades', () => {
    it('should fetch trades with filters', async () => {
      const mockTrades = {
        trades: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/trades')
        .query({ market_id: 1 })
        .reply(200, mockTrades);

      const result = await api.getTrades({ market_id: 1 });
      expect(result).toEqual(mockTrades);
    });
  });

  describe('exportData', () => {
    it('should export account data', async () => {
      const mockExport = {
        file_url: 'https://export.url/file.csv',
      };

      nock(baseURL)
        .get('/api/v1/export')
        .query({ account_index: 1, start_time: 100, end_time: 200, auth: 'token' })
        .reply(200, mockExport);

      const result = await api.exportData({
        account_index: 1,
        start_time: 100,
        end_time: 200,
        auth: 'token',
      });
      expect(result).toEqual(mockExport);
    });
  });
});
