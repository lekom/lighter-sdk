# Quick Start Guide

Get up and running with the Lighter SDK in minutes.

## Installation

```bash
npm install @lighter/sdk
```

## Basic Setup

### 1. Import the SDK

```typescript
import { LighterClient } from '@lighter/sdk';
```

### 2. Create a Client

```typescript
// For mainnet
const client = new LighterClient({ network: 'mainnet' });

// For staging
const client = new LighterClient({ network: 'staging' });

// Custom configuration
const client = new LighterClient({
  baseURL: 'https://custom.api.url',
  timeout: 30000,
  retries: 3,
});
```

## Common Operations

### Get System Status

```typescript
const status = await client.root.getStatus();
console.log(status);
```

### Get Order Books

```typescript
const orderBooks = await client.order.getOrderBooks();
orderBooks.order_books.forEach(market => {
  console.log(`${market.symbol}: ${market.base_token}/${market.quote_token}`);
});
```

### Get Market Data

```typescript
// Get order book depth
const orderBook = await client.order.getOrderBookDetails({
  market_id: 1,
  depth: 10,
});
console.log('Best bid:', orderBook.bids[0]);
console.log('Best ask:', orderBook.asks[0]);

// Get recent trades
const trades = await client.order.getRecentTrades({
  market_id: 1,
  limit: 10,
});

// Get candlestick data
const candles = await client.market.getCandlesticks({
  market_id: 1,
  interval: '1h',
  limit: 24,
});
```

### Get Account Information

```typescript
const account = await client.account.getAccount({
  account_index: 1,
});
console.log('Collateral:', account.collateral);
console.log('Positions:', account.positions);
```

## Trading Operations

### 1. Create Signer Client

```typescript
import { SignerClient } from '@lighter/sdk';

const signer = new SignerClient({
  baseURL: 'https://mainnet.zklighter.elliot.ai',
  privateKey: process.env.PRIVATE_KEY!,
  accountIndex: 1,
});
```

### 2. Place Orders

```typescript
// Place a limit order
const order = await signer.createOrder({
  market_id: 1,
  side: 'buy',
  type: 'limit',
  time_in_force: 'gtc',
  price: '50000',
  size: '0.1',
});
console.log('Order placed:', order.tx_hash);

// Place a market order
const marketOrder = await signer.createOrder({
  market_id: 1,
  side: 'sell',
  type: 'market',
  time_in_force: 'ioc',
  price: '0', // Market orders can use 0 for price
  size: '0.05',
});
```

### 3. Cancel Orders

```typescript
// Get active orders first
const activeOrders = await client.order.getAccountActiveOrders({
  account_index: 1,
});

// Cancel an order
if (activeOrders.orders.length > 0) {
  const orderToCancel = activeOrders.orders[0];
  await signer.cancelOrder({
    order_nonce: orderToCancel.order_nonce,
    market_id: orderToCancel.market_id,
  });
}
```

### 4. Manage Funds

```typescript
// Deposit
await signer.deposit({
  amount: '1000',
  token: 'USDC',
});

// Withdraw
await signer.withdraw({
  amount: '500',
  token: 'USDC',
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
});

// Transfer between accounts
await signer.transfer({
  amount: '100',
  token: 'USDC',
  to_account_index: 2,
});
```

## Error Handling

```typescript
import { ApiError } from '@lighter/sdk';

try {
  const account = await client.account.getAccount({
    account_index: 999999,
  });
} catch (error) {
  const apiError = error as ApiError;
  console.error('Error code:', apiError.code);
  console.error('Message:', apiError.message);

  // Handle specific errors
  if (apiError.code === 'NOT_FOUND') {
    console.log('Account not found');
  }
}
```

## Monitoring Portfolio

```typescript
async function monitorPortfolio(accountIndex: number) {
  // Get account status
  const account = await client.account.getAccount({
    account_index: accountIndex,
  });

  // Get PnL
  const pnl = await client.account.getPnL({
    account_index: accountIndex,
  });

  // Get active orders
  const orders = await client.order.getAccountActiveOrders({
    account_index: accountIndex,
  });

  console.log('=== Portfolio Summary ===');
  console.log('Collateral:', account.collateral);
  console.log('Total PnL:', pnl.total_pnl);
  console.log('Active Orders:', orders.total);
  console.log('Positions:', account.positions.length);
}
```

## Advanced Features

### Authentication

```typescript
// Set authentication token
client.setAuthToken('your-api-key');

// Make authenticated requests
const orders = await client.order.getAccountActiveOrders({
  account_index: 1,
  auth: 'your-auth-string',
});

// Remove authentication
client.removeAuthToken();
```

### Create Signer from Client

```typescript
const client = new LighterClient({ network: 'mainnet' });

// Create signer from existing client
const signer = client.createSignerClient(
  'your-private-key',
  1  // account index
);
```

### Custom Network Configuration

```typescript
const client = new LighterClient({
  baseURL: 'https://custom.lighter.network',
  timeout: 60000,      // 60 seconds
  retries: 5,          // Retry failed requests 5 times
  retryDelay: 2000,    // 2 seconds between retries
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## Next Steps

- Read the full [README.md](./README.md) for complete API reference
- Check out [examples/](./examples/) for more detailed examples
- Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture details
- See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for complete feature list

## Need Help?

- API Documentation: https://apidocs.lighter.xyz
- GitHub Issues: https://github.com/lighter/sdk/issues
- Discord: https://discord.gg/lighter

## Environment Variables

For production use, store sensitive data in environment variables:

```bash
# .env file
PRIVATE_KEY=0x...
ACCOUNT_INDEX=1
LIGHTER_API_KEY=your-api-key
```

```typescript
import dotenv from 'dotenv';
dotenv.config();

const signer = new SignerClient({
  baseURL: 'https://mainnet.zklighter.elliot.ai',
  privateKey: process.env.PRIVATE_KEY!,
  accountIndex: parseInt(process.env.ACCOUNT_INDEX!),
});
```
