import nock from 'nock';
import { HttpClient } from '../../client/http-client';
import { TransactionApi } from '../transaction-api';

describe('TransactionApi', () => {
  const baseURL = 'https://api.test.com';
  let client: HttpClient;
  let api: TransactionApi;

  beforeEach(() => {
    client = new HttpClient({ baseURL });
    api = new TransactionApi(client);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('sendTransaction', () => {
    it('should send transaction successfully', async () => {
      const txRequest = {
        tx_type: 'create_order',
        account_index: 1,
        payload: {
          market_id: 1,
          side: 'buy',
          type: 'limit',
          price: '50000',
          size: '1',
        },
        signature: '0xsignature',
        nonce: 1,
      };

      const mockResponse = {
        tx_hash: '0xtxhash',
        status: 'pending',
        timestamp: Date.now(),
      };

      nock(baseURL).post('/api/v1/sendTx', txRequest).reply(200, mockResponse);

      const result = await api.sendTransaction(txRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendTransactionBatch', () => {
    it('should send batch of transactions', async () => {
      const batchRequest = {
        transactions: [
          {
            tx_type: 'create_order',
            account_index: 1,
            payload: { market_id: 1 },
            signature: '0xsig1',
            nonce: 1,
          },
          {
            tx_type: 'cancel_order',
            account_index: 1,
            payload: { order_nonce: 1 },
            signature: '0xsig2',
            nonce: 2,
          },
        ],
      };

      const mockResponse = {
        batch_id: 'batch-1',
        transactions: [
          { tx_hash: '0xtx1', status: 'pending', timestamp: Date.now() },
          { tx_hash: '0xtx2', status: 'pending', timestamp: Date.now() },
        ],
      };

      nock(baseURL).post('/api/v1/sendTxBatch', batchRequest).reply(200, mockResponse);

      const result = await api.sendTransactionBatch(batchRequest);
      expect(result).toEqual(mockResponse);
      expect(result.transactions).toHaveLength(2);
    });
  });

  describe('getTransaction', () => {
    it('should fetch transaction by hash', async () => {
      const mockTx = {
        tx_hash: '0xtxhash',
        tx_type: 'create_order',
        account_index: 1,
        block_number: 12345,
        timestamp: Date.now(),
        status: 'confirmed',
        payload: { market_id: 1 },
        signature: '0xsignature',
        nonce: 1,
        gas_used: '21000',
      };

      nock(baseURL)
        .get('/api/v1/tx')
        .query({ tx_hash: '0xtxhash' })
        .reply(200, mockTx);

      const result = await api.getTransaction({ tx_hash: '0xtxhash' });
      expect(result).toEqual(mockTx);
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions with filters', async () => {
      const mockTxs = {
        transactions: [
          {
            tx_hash: '0xtx1',
            tx_type: 'create_order',
            account_index: 1,
            block_number: 12345,
            timestamp: Date.now(),
            status: 'confirmed',
            payload: {},
            signature: '0xsig1',
            nonce: 1,
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/txs')
        .query({ account_index: 1, limit: 10 })
        .reply(200, mockTxs);

      const result = await api.getTransactions({ account_index: 1, limit: 10 });
      expect(result).toEqual(mockTxs);
    });
  });

  describe('getDepositHistory', () => {
    it('should fetch deposit history', async () => {
      const mockDeposits = {
        deposits: [
          {
            deposit_id: 'dep-1',
            account_index: 1,
            amount: '1000',
            token: 'USDC',
            tx_hash: '0xtx',
            status: 'confirmed',
            timestamp: Date.now(),
          },
        ],
        total: 1,
      };

      nock(baseURL)
        .get('/api/v1/deposit_history')
        .query({ account_index: 1 })
        .reply(200, mockDeposits);

      const result = await api.getDepositHistory({ account_index: 1 });
      expect(result).toEqual(mockDeposits);
    });
  });

  describe('getNextNonce', () => {
    it('should fetch next nonce', async () => {
      const mockNonce = {
        account_index: 1,
        next_nonce: 5,
      };

      nock(baseURL)
        .get('/api/v1/nextNonce')
        .query({ account_index: 1 })
        .reply(200, mockNonce);

      const result = await api.getNextNonce({ account_index: 1 });
      expect(result).toEqual(mockNonce);
    });
  });

  describe('getLogs', () => {
    it('should fetch logs with filters', async () => {
      const mockLogs = {
        logs: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/logs')
        .query({ account_index: 1 })
        .reply(200, mockLogs);

      const result = await api.getLogs({ account_index: 1 });
      expect(result).toEqual(mockLogs);
    });
  });

  describe('getBlockTransactions', () => {
    it('should fetch block transactions', async () => {
      const mockBlockTxs = {
        block_number: 12345,
        transactions: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/blockTxs')
        .query({ block_number: 12345 })
        .reply(200, mockBlockTxs);

      const result = await api.getBlockTransactions({ block_number: 12345 });
      expect(result).toEqual(mockBlockTxs);
    });
  });

  describe('getWithdrawHistory', () => {
    it('should fetch withdraw history', async () => {
      const mockWithdraws = {
        withdrawals: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/withdraw_history')
        .query({ account_index: 1 })
        .reply(200, mockWithdraws);

      const result = await api.getWithdrawHistory({ account_index: 1 });
      expect(result).toEqual(mockWithdraws);
    });
  });

  describe('getTransferHistory', () => {
    it('should fetch transfer history', async () => {
      const mockTransfers = {
        transfers: [],
        total: 0,
      };

      nock(baseURL)
        .get('/api/v1/transfer_history')
        .query({ account_index: 1 })
        .reply(200, mockTransfers);

      const result = await api.getTransferHistory({ account_index: 1 });
      expect(result).toEqual(mockTransfers);
    });
  });
});
