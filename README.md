# Lighter SDK

A comprehensive TypeScript SDK for interacting with the [Lighter Protocol](https://lighter.xyz) - a high-performance decentralized exchange built on zkSync.

## Features

- **Complete API Coverage**: Implements all Lighter API endpoints
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Transaction Signing**: Built-in support for signing transactions with EIP-712
- **Error Handling**: Robust error handling with automatic retries
- **Easy to Use**: Intuitive API design with clear documentation
- **Thoroughly Tested**: Comprehensive unit and integration tests

## Installation

```bash
npm install @lighter/sdk
```

## Quick Start

### Read-Only Operations

```typescript
import { LighterClient } from '@lighter/sdk';

const client = new LighterClient({
  network: 'mainnet', // or 'staging'
});

// Get system status
const status = await client.root.getStatus();

// Get order books
const orderBooks = await client.order.getOrderBooks();

// Get account information
const account = await client.account.getAccount({
  account_index: 1,
});

// Get recent trades
const trades = await client.order.getRecentTrades({
  market_id: 1,
  limit: 10,
});
```

### Authenticated Operations

```typescript
import { SignerClient } from '@lighter/sdk';

const signerClient = new SignerClient({
  baseURL: 'https://mainnet.zklighter.elliot.ai',
  privateKey: 'your-private-key',
  accountIndex: 1,
  chainId: 1, // optional, defaults to 1
});

// Create a limit order
const order = await signerClient.createOrder({
  market_id: 1,
  side: 'buy',
  type: 'limit',
  time_in_force: 'gtc',
  price: '50000',
  size: '1.5',
});

// Cancel an order
const cancelResult = await signerClient.cancelOrder({
  order_nonce: 123,
  market_id: 1,
});

// Deposit funds
const deposit = await signerClient.deposit({
  amount: '1000',
  token: 'USDC',
});

// Withdraw funds
const withdraw = await signerClient.withdraw({
  amount: '500',
  token: 'USDC',
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
});
```

## API Reference

### LighterClient

The main client for read-only operations.

```typescript
const client = new LighterClient({
  network: 'mainnet' | 'staging',
  baseURL?: string,
  timeout?: number,
  retries?: number,
  retryDelay?: number,
});
```

#### Root API

```typescript
// Get system status
await client.root.getStatus();

// Get system information
await client.root.getInfo();
```

#### Account API

```typescript
// Get account by index
await client.account.getAccount({ account_index: 1 });

// Get accounts by L1 address
await client.account.getAccountsByL1Address({
  l1_address: '0x...',
});

// Get account limits
await client.account.getAccountLimits({ account_index: 1 });

// Get account PnL
await client.account.getPnL({
  account_index: 1,
  start_time: Date.now() - 86400000,
  end_time: Date.now(),
});

// Get liquidations
await client.account.getLiquidations({
  account_index: 1,
  limit: 10,
});

// Get position funding
await client.account.getPositionFunding({
  account_index: 1,
  market_id: 1,
});
```

#### Order API

```typescript
// Get active orders
await client.order.getAccountActiveOrders({
  account_index: 1,
  market_id: 1,
});

// Get inactive orders
await client.order.getAccountInactiveOrders({
  account_index: 1,
  limit: 50,
});

// Get order books
await client.order.getOrderBooks();

// Get order book details
await client.order.getOrderBookDetails({
  market_id: 1,
  depth: 20,
});

// Get recent trades
await client.order.getRecentTrades({
  market_id: 1,
  limit: 100,
});

// Get exchange stats
await client.order.getExchangeStats({
  market_id: 1,
  period: '24h',
});
```

#### Transaction API

```typescript
// Get transaction by hash
await client.transaction.getTransaction({
  tx_hash: '0x...',
});

// Get transactions
await client.transaction.getTransactions({
  account_index: 1,
  limit: 50,
});

// Get transaction logs
await client.transaction.getLogs({
  account_index: 1,
  market_id: 1,
});

// Get deposit history
await client.transaction.getDepositHistory({
  account_index: 1,
});

// Get withdraw history
await client.transaction.getWithdrawHistory({
  account_index: 1,
});

// Get next nonce
await client.transaction.getNextNonce({
  account_index: 1,
});
```

#### Market API

```typescript
// Get candlestick data
await client.market.getCandlesticks({
  market_id: 1,
  interval: '1h',
  limit: 100,
});

// Get funding rates
await client.market.getFundingRates();

// Get funding history
await client.market.getFundings({
  market_id: 1,
  start_time: Date.now() - 86400000,
});

// Get bridge information
await client.market.getFastBridgeInfo();
```

#### Explorer API

```typescript
// Get account logs
await client.explorer.getAccountLogs({
  account_index: 1,
  limit: 50,
});

// Get blocks
await client.explorer.getBlocks({ limit: 10 });

// Get block by number
await client.explorer.getBlock({ block_number: 12345 });

// Get markets
await client.explorer.getMarkets();

// Search
await client.explorer.search({
  query: 'BTC',
  type: 'market',
});

// Get explorer stats
await client.explorer.getStats({ period: '24h' });
```

### SignerClient

Client for authenticated operations that require transaction signing.

```typescript
const signerClient = new SignerClient({
  baseURL: string,
  privateKey: string,
  accountIndex: number,
  chainId?: number,
  timeout?: number,
});
```

#### Methods

```typescript
// Get wallet address
signerClient.getAddress(): string

// Get account index
signerClient.getAccountIndex(): number

// Sync nonce with the server
await signerClient.syncNonce(): Promise<number>

// Create an order
await signerClient.createOrder({
  market_id: number,
  side: 'buy' | 'sell',
  type: 'limit' | 'market',
  time_in_force: 'gtc' | 'ioc' | 'fok' | 'post_only',
  price: string,
  size: string,
  client_order_id?: string,
}): Promise<SendTxResponse>

// Cancel an order
await signerClient.cancelOrder({
  order_nonce: number,
  market_id: number,
}): Promise<SendTxResponse>

// Deposit funds
await signerClient.deposit({
  amount: string,
  token: string,
}): Promise<SendTxResponse>

// Withdraw funds
await signerClient.withdraw({
  amount: string,
  token: string,
  recipient: string,
}): Promise<SendTxResponse>

// Transfer funds to another account
await signerClient.transfer({
  amount: string,
  token: string,
  to_account_index: number,
}): Promise<SendTxResponse>

// Sign a message
await signerClient.signMessage(message: string): Promise<string>
```

## Advanced Usage

### Creating a SignerClient from LighterClient

```typescript
const client = new LighterClient({ network: 'mainnet' });

const signerClient = client.createSignerClient(
  'your-private-key',
  1 // account index
);

await signerClient.createOrder({
  market_id: 1,
  side: 'buy',
  type: 'limit',
  time_in_force: 'gtc',
  price: '50000',
  size: '1',
});
```

### Custom Base URL

```typescript
const client = new LighterClient({
  baseURL: 'https://custom.lighter.api',
});
```

### Authentication with API Keys

```typescript
const client = new LighterClient({ network: 'mainnet' });
client.setAuthToken('your-api-key');

// Make authenticated requests
const orders = await client.order.getAccountActiveOrders({
  account_index: 1,
  auth: 'your-auth-string',
});

// Remove auth token
client.removeAuthToken();
```

### Error Handling

```typescript
import { LighterClient, ApiError } from '@lighter/sdk';

const client = new LighterClient();

try {
  const account = await client.account.getAccount({ account_index: 1 });
} catch (error) {
  const apiError = error as ApiError;
  console.error('Error code:', apiError.code);
  console.error('Error message:', apiError.message);
  console.error('Error details:', apiError.details);
}
```

### Custom Retry Configuration

```typescript
const client = new LighterClient({
  network: 'mainnet',
  retries: 5,
  retryDelay: 2000, // 2 seconds
});
```

## Type Definitions

The SDK exports comprehensive TypeScript types for all API requests and responses:

```typescript
import {
  AccountResponse,
  OrderResponse,
  TransactionResponse,
  CandlesticksResponse,
  OrderSide,
  OrderType,
  TimeInForce,
  // ... and many more
} from '@lighter/sdk';
```

## Examples

### Trading Bot Example

```typescript
import { LighterClient, SignerClient } from '@lighter/sdk';

async function tradingBot() {
  const client = new LighterClient({ network: 'mainnet' });
  const signer = new SignerClient({
    baseURL: 'https://mainnet.zklighter.elliot.ai',
    privateKey: process.env.PRIVATE_KEY!,
    accountIndex: 1,
  });

  // Get current market price
  const orderBook = await client.order.getOrderBookDetails({
    market_id: 1,
    depth: 1,
  });

  const currentPrice = orderBook.last_price;

  // Place a buy order 1% below current price
  const buyPrice = (parseFloat(currentPrice!) * 0.99).toFixed(2);

  await signer.createOrder({
    market_id: 1,
    side: 'buy',
    type: 'limit',
    time_in_force: 'gtc',
    price: buyPrice,
    size: '0.1',
  });

  console.log(`Buy order placed at ${buyPrice}`);
}
```

### Portfolio Monitor Example

```typescript
import { LighterClient } from '@lighter/sdk';

async function monitorPortfolio(accountIndex: number) {
  const client = new LighterClient({ network: 'mainnet' });

  // Get account details
  const account = await client.account.getAccount({ accountIndex });

  console.log('Collateral:', account.collateral);
  console.log('Positions:', account.positions);

  // Get PnL
  const pnl = await client.account.getPnL({ account_index: accountIndex });

  console.log('Total PnL:', pnl.total_pnl);
  console.log('Realized PnL:', pnl.realized_pnl);
  console.log('Unrealized PnL:', pnl.unrealized_pnl);

  // Get active orders
  const activeOrders = await client.order.getAccountActiveOrders({
    account_index: accountIndex,
  });

  console.log('Active orders:', activeOrders.total);
}
```

## Development

### Running Tests

```bash
npm test
```

### Running Tests with Coverage

```bash
npm run test:coverage
```

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [https://github.com/lighter/sdk/issues](https://github.com/lighter/sdk/issues)
- Documentation: [https://apidocs.lighter.xyz](https://apidocs.lighter.xyz)
- Discord: [https://discord.gg/lighter](https://discord.gg/lighter)
