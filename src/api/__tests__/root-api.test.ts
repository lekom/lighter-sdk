import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { RootApi } from '../root-api';

describe('RootApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: RootApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new RootApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getStatus', () => {
    it('should fetch status successfully', async () => {
      const mockStatus = {
        status: 'operational',
        version: '1.0.0',
        timestamp: Date.now(),
      };

      nock(baseURL).get('/api/v1/status').reply(200, mockStatus);

      const result = await api.getStatus();
      expect(result).toEqual(mockStatus);
    });
  });

  describe('getInfo', () => {
    it('should fetch info successfully', async () => {
      const mockInfo = {
        transfer_fee_info: {
          fee_percentage: '0.1',
          minimum_fee: '1',
          maximum_fee: '100',
        },
        withdrawal_delay: 3600,
      };

      nock(baseURL).get('/api/v1/info').reply(200, mockInfo);

      const result = await api.getInfo();
      expect(result).toEqual(mockInfo);
    });
  });
});
