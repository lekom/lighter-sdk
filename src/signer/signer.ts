import { Wallet, TypedDataDomain, TypedDataField } from 'ethers';
import { SignableTransaction, SignedTransaction } from './types';

export class TransactionSigner {
  private wallet: Wallet;
  private domain: TypedDataDomain;

  constructor(privateKey: string, chainId: number = 1) {
    this.wallet = new Wallet(privateKey);
    this.domain = {
      name: 'Lighter',
      version: '1',
      chainId,
    };
  }

  getAddress(): string {
    return this.wallet.address;
  }

  async signTransaction(transaction: SignableTransaction): Promise<SignedTransaction> {
    const types = this.getTypesForTransaction(transaction.tx_type);
    const value = {
      tx_type: transaction.tx_type,
      account_index: transaction.account_index,
      nonce: transaction.nonce,
      ...transaction.payload,
    };

    const signature = await this.wallet.signTypedData(this.domain, types, value);

    return {
      ...transaction,
      signature,
    };
  }

  async signMessage(message: string): Promise<string> {
    return this.wallet.signMessage(message);
  }

  private getTypesForTransaction(txType: string): Record<string, TypedDataField[]> {
    const baseTypes: Record<string, TypedDataField[]> = {
      Transaction: [
        { name: 'tx_type', type: 'string' },
        { name: 'account_index', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    };

    switch (txType) {
      case 'create_order':
        return {
          Transaction: [
            ...baseTypes.Transaction,
            { name: 'market_id', type: 'uint256' },
            { name: 'side', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'time_in_force', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'size', type: 'string' },
            { name: 'client_order_id', type: 'string' },
          ],
        };

      case 'cancel_order':
        return {
          Transaction: [
            ...baseTypes.Transaction,
            { name: 'order_nonce', type: 'uint256' },
            { name: 'market_id', type: 'uint256' },
          ],
        };

      case 'deposit':
        return {
          Transaction: [
            ...baseTypes.Transaction,
            { name: 'amount', type: 'string' },
            { name: 'token', type: 'string' },
          ],
        };

      case 'withdraw':
        return {
          Transaction: [
            ...baseTypes.Transaction,
            { name: 'amount', type: 'string' },
            { name: 'token', type: 'string' },
            { name: 'recipient', type: 'string' },
          ],
        };

      case 'transfer':
        return {
          Transaction: [
            ...baseTypes.Transaction,
            { name: 'amount', type: 'string' },
            { name: 'token', type: 'string' },
            { name: 'to_account_index', type: 'uint256' },
          ],
        };

      default:
        return baseTypes;
    }
  }
}
