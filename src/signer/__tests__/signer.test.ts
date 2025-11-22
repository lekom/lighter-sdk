import { TransactionSigner } from '../signer';
import { SignableTransaction } from '../types';

describe('TransactionSigner', () => {
  const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  let signer: TransactionSigner;

  beforeEach(() => {
    signer = new TransactionSigner(privateKey);
  });

  describe('getAddress', () => {
    it('should return wallet address', () => {
      const address = signer.getAddress();
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });

  describe('signTransaction', () => {
    it('should sign create_order transaction', async () => {
      const transaction: SignableTransaction = {
        tx_type: 'create_order',
        account_index: 1,
        nonce: 1,
        payload: {
          market_id: 1,
          side: 'buy',
          type: 'limit',
          time_in_force: 'gtc',
          price: '50000',
          size: '1',
          client_order_id: '',
        },
      };

      const signed = await signer.signTransaction(transaction);
      expect(signed.signature).toBeTruthy();
      expect(signed.signature).toMatch(/^0x[a-fA-F0-9]+$/);
      expect(signed.tx_type).toBe('create_order');
      expect(signed.account_index).toBe(1);
      expect(signed.nonce).toBe(1);
    });

    it('should sign cancel_order transaction', async () => {
      const transaction: SignableTransaction = {
        tx_type: 'cancel_order',
        account_index: 1,
        nonce: 2,
        payload: {
          order_nonce: 1,
          market_id: 1,
        },
      };

      const signed = await signer.signTransaction(transaction);
      expect(signed.signature).toBeTruthy();
      expect(signed.tx_type).toBe('cancel_order');
    });

    it('should sign deposit transaction', async () => {
      const transaction: SignableTransaction = {
        tx_type: 'deposit',
        account_index: 1,
        nonce: 3,
        payload: {
          amount: '1000',
          token: 'USDC',
        },
      };

      const signed = await signer.signTransaction(transaction);
      expect(signed.signature).toBeTruthy();
      expect(signed.tx_type).toBe('deposit');
    });

    it('should sign withdraw transaction', async () => {
      const transaction: SignableTransaction = {
        tx_type: 'withdraw',
        account_index: 1,
        nonce: 4,
        payload: {
          amount: '500',
          token: 'USDC',
          recipient: '0x123',
        },
      };

      const signed = await signer.signTransaction(transaction);
      expect(signed.signature).toBeTruthy();
      expect(signed.tx_type).toBe('withdraw');
    });

    it('should sign transfer transaction', async () => {
      const transaction: SignableTransaction = {
        tx_type: 'transfer',
        account_index: 1,
        nonce: 5,
        payload: {
          amount: '100',
          token: 'USDC',
          to_account_index: 2,
        },
      };

      const signed = await signer.signTransaction(transaction);
      expect(signed.signature).toBeTruthy();
      expect(signed.tx_type).toBe('transfer');
    });
  });

  describe('signMessage', () => {
    it('should sign message', async () => {
      const message = 'Hello, Lighter!';
      const signature = await signer.signMessage(message);
      expect(signature).toBeTruthy();
      expect(signature).toMatch(/^0x[a-fA-F0-9]+$/);
    });
  });
});
