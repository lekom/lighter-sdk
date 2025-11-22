import nock from 'nock';
import { HttpClient } from '../http-client';
import { ApiError } from '../../types';

describe('HttpClient', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('GET requests', () => {
    it('should successfully make GET request', async () => {
      const mockData = { result: 'success' };
      nock(baseURL).get('/test').reply(200, mockData);

      const result = await client.get('/test');
      expect(result).toEqual(mockData);
    });

    it('should pass query parameters', async () => {
      const mockData = { result: 'success' };
      nock(baseURL).get('/test').query({ id: '123' }).reply(200, mockData);

      const result = await client.get('/test', { params: { id: '123' } });
      expect(result).toEqual(mockData);
    });
  });

  describe('POST requests', () => {
    it('should successfully make POST request', async () => {
      const postData = { name: 'test' };
      const mockResponse = { id: 1, ...postData };

      nock(baseURL).post('/test', postData).reply(200, mockResponse);

      const result = await client.post('/test', postData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle 404 errors', async () => {
      nock(baseURL).get('/notfound').reply(404, {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      });

      await expect(client.get('/notfound')).rejects.toMatchObject({
        code: 'NOT_FOUND',
        message: 'Resource not found',
      } as ApiError);
    });

    it('should handle 500 errors with retries', async () => {
      nock(baseURL)
        .get('/error')
        .times(4)
        .reply(500, { code: 'SERVER_ERROR', message: 'Internal Server Error' });

      await expect(client.get('/error')).rejects.toMatchObject({
        code: 'SERVER_ERROR',
      } as ApiError);
    });

    it('should handle network errors', async () => {
      nock(baseURL).get('/network-error').replyWithError('Network error');

      await expect(client.get('/network-error')).rejects.toMatchObject({
        code: 'NETWORK_ERROR',
      } as ApiError);
    });
  });

  describe('Headers', () => {
    it('should set custom headers', async () => {
      client.setHeader('X-Custom-Header', 'test-value');

      nock(baseURL)
        .get('/test')
        .matchHeader('X-Custom-Header', 'test-value')
        .reply(200, {});

      await client.get('/test');
    });

    it('should remove headers', async () => {
      client.setHeader('X-Custom-Header', 'test-value');
      client.removeHeader('X-Custom-Header');

      nock(baseURL)
        .get('/test')
        .reply(200, function () {
          expect(this.req.headers['x-custom-header']).toBeUndefined();
          return {};
        });

      await client.get('/test');
    });
  });

  describe('Retry logic', () => {
    it('should retry on 503 errors', async () => {
      let attempts = 0;

      nock(baseURL)
        .get('/retry-test')
        .times(2)
        .reply(503, () => {
          attempts++;
          return { error: 'Service Unavailable' };
        });

      nock(baseURL).get('/retry-test').reply(200, { success: true });

      const result = await client.get('/retry-test');
      expect(result).toEqual({ success: true });
      expect(attempts).toBe(2);
    });
  });

  describe('PUT and DELETE requests', () => {
    it('should make PUT request', async () => {
      const data = { name: 'updated' };
      nock(baseURL).put('/test', data).reply(200, { success: true });

      const result = await client.put('/test', data);
      expect(result).toEqual({ success: true });
    });

    it('should make DELETE request', async () => {
      nock(baseURL).delete('/test').reply(200, { success: true });

      const result = await client.delete('/test');
      expect(result).toEqual({ success: true });
    });
  });
});
