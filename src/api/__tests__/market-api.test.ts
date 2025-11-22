import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { MarketApi } from '../market-api';

describe('MarketApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: MarketApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new MarketApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getCandlesticks', () => {
    it('should fetch candlestick data', async () => {
      const mockCandlesticks = {
        market_id: 1,
        interval: '1h' as const,
        candlesticks: [
          {
            timestamp: Date.now(),
            open: '50000',
            high: '51000',
            low: '49500',
            close: '50500',
            volume: '100',
            num_trades: 50,
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/candlesticks')
        .query({ market_id: 1, interval: '1h' })
        .reply(200, mockCandlesticks);

      const result = await api.getCandlesticks({ market_id: 1, interval: '1h' });
      expect(result).toEqual(mockCandlesticks);
      expect(result.candlesticks).toHaveLength(1);
    });
  });

  describe('getFundings', () => {
    it('should fetch funding data', async () => {
      const mockFundings = {
        market_id: 1,
        fundings: [
          {
            market_id: 1,
            timestamp: Date.now(),
            funding_rate: '0.01',
            index_price: '50000',
            mark_price: '50010',
          },
        ],
      };

      nock(baseURL)
        .get('/api/v1/fundings')
        .query({ market_id: 1 })
        .reply(200, mockFundings);

      const result = await api.getFundings({ market_id: 1 });
      expect(result).toEqual(mockFundings);
    });
  });

  describe('getFundingRates', () => {
    it('should fetch current funding rates', async () => {
      const mockRates = {
        funding_rates: [
          {
            market_id: 1,
            market_symbol: 'BTC-USD',
            current_funding_rate: '0.01',
            predicted_funding_rate: '0.012',
            next_funding_time: Date.now() + 3600000,
            index_price: '50000',
            mark_price: '50010',
          },
        ],
      };

      nock(baseURL).get('/api/v1/funding-rates').reply(200, mockRates);

      const result = await api.getFundingRates();
      expect(result).toEqual(mockRates);
    });
  });

  describe('getFastBridgeInfo', () => {
    it('should fetch bridge information', async () => {
      const mockBridge = {
        supported_chains: [
          { chain_id: '1', chain_name: 'Ethereum', native_token: 'ETH' },
        ],
        bridges: [
          {
            from_chain: '1',
            to_chain: '42161',
            min_amount: '0.01',
            max_amount: '100',
            estimated_time: 600,
            fee_percentage: '0.1',
          },
        ],
      };

      nock(baseURL).get('/api/v1/fastbridge_info').reply(200, mockBridge);

      const result = await api.getFastBridgeInfo();
      expect(result).toEqual(mockBridge);
    });
  });
});
