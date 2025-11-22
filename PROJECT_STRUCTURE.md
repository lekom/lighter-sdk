# Lighter SDK Project Structure

## Overview
This is a comprehensive TypeScript SDK for the Lighter Protocol API, providing type-safe access to all endpoints with full test coverage.

## Directory Structure

```
lighter-sdk/
├── src/
│   ├── api/                      # API client implementations
│   │   ├── __tests__/           # Unit tests for API clients
│   │   ├── account-api.ts       # Account management endpoints
│   │   ├── explorer-api.ts      # Blockchain explorer endpoints
│   │   ├── market-api.ts        # Market data endpoints
│   │   ├── order-api.ts         # Order book and trading endpoints
│   │   ├── root-api.ts          # Root/system endpoints
│   │   └── transaction-api.ts   # Transaction management endpoints
│   ├── client/                   # HTTP client infrastructure
│   │   ├── __tests__/           # HTTP client tests
│   │   └── http-client.ts       # Base HTTP client with retry logic
│   ├── signer/                   # Transaction signing
│   │   ├── __tests__/           # Signer tests
│   │   ├── signer.ts            # EIP-712 transaction signer
│   │   ├── signer-client.ts     # Client for authenticated operations
│   │   └── types.ts             # Signer-specific types
│   ├── types/                    # TypeScript type definitions
│   │   ├── account.ts           # Account-related types
│   │   ├── common.ts            # Common/shared types
│   │   ├── explorer.ts          # Explorer-related types
│   │   ├── index.ts             # Type exports
│   │   ├── market.ts            # Market data types
│   │   ├── order.ts             # Order-related types
│   │   ├── status.ts            # Status/info types
│   │   └── transaction.ts       # Transaction types
│   ├── __tests__/               # Integration tests
│   │   └── lighter-client.test.ts
│   ├── index.ts                 # Main SDK export
│   └── lighter-client.ts        # Main client class
├── examples/                     # Usage examples
│   ├── account-monitoring.ts    # Monitor account positions and PnL
│   ├── basic-usage.ts           # Basic SDK usage
│   ├── market-data.ts           # Fetch market data
│   └── signer-usage.ts          # Create and sign transactions
├── dist/                        # Compiled JavaScript (generated)
├── coverage/                    # Test coverage reports (generated)
├── package.json                 # NPM package configuration
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest test configuration
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── README.md                   # Main documentation
├── CHANGELOG.md                # Version history
└── PROJECT_STRUCTURE.md        # This file
```

## Key Components

### 1. API Clients (`src/api/`)
Each API client handles a specific domain of the Lighter API:
- **RootApi**: System status and information
- **AccountApi**: Account management, PnL, liquidations
- **OrderApi**: Order books, trades, exchange statistics
- **TransactionApi**: Transaction submission and history
- **MarketApi**: Candlesticks, funding rates, bridge info
- **ExplorerApi**: Blockchain explorer data

### 2. HTTP Client (`src/client/`)
- Axios-based HTTP client
- Automatic retry logic for failed requests
- Exponential backoff
- Custom error handling
- Configurable timeouts and retries

### 3. Transaction Signing (`src/signer/`)
- **TransactionSigner**: EIP-712 compliant transaction signing
- **SignerClient**: High-level client for creating signed transactions
- Support for orders, deposits, withdrawals, and transfers

### 4. Type Definitions (`src/types/`)
Comprehensive TypeScript types for:
- All API requests and responses
- Enums for order types, sides, time-in-force
- Common types for pagination, date ranges
- Domain-specific types for each API category

### 5. Main Client (`src/lighter-client.ts`)
- Unified entry point for all API operations
- Factory method for creating SignerClient
- Support for mainnet and staging networks
- Authentication token management

## Testing

### Test Coverage
- **Total**: 98%+ coverage
- **Unit Tests**: 80 tests across all modules
- **Integration Tests**: Full client integration
- **Mock Server**: Using `nock` for HTTP mocking

### Running Tests
```bash
npm test                 # Run all tests
npm run test:coverage    # Run with coverage report
npm run test:watch       # Watch mode
```

## Building

```bash
npm run build           # Compile TypeScript to JavaScript
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

## Examples

The `examples/` directory contains practical usage examples:
- **basic-usage.ts**: Demonstrates read-only operations
- **signer-usage.ts**: Shows how to create and sign transactions
- **account-monitoring.ts**: Portfolio monitoring and tracking
- **market-data.ts**: Fetching and displaying market data

## Type Safety

All API methods are fully typed with:
- Request parameter interfaces
- Response type definitions
- Enum types for constants
- Generic error types

## Error Handling

The SDK provides structured error handling:
- `ApiError` interface with code, message, and details
- HTTP status code mapping
- Network error detection
- Retry exhaustion handling

## Configuration

### Client Configuration
```typescript
interface LighterClientConfig {
  baseURL?: string;
  network?: 'mainnet' | 'staging';
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}
```

### Signer Configuration
```typescript
interface SignerClientConfig {
  baseURL: string;
  privateKey: string;
  accountIndex: number;
  chainId?: number;
  timeout?: number;
}
```

## Development Workflow

1. **Add new endpoint**: Create method in appropriate API client
2. **Define types**: Add request/response types in `src/types/`
3. **Write tests**: Add test cases in `__tests__/` directory
4. **Run tests**: Ensure all tests pass with coverage
5. **Build**: Compile and verify no TypeScript errors
6. **Document**: Update README with new functionality

## Best Practices

1. **Always use TypeScript types**: Never use `any`
2. **Test all public methods**: Maintain high test coverage
3. **Handle errors properly**: Use try-catch and ApiError
4. **Keep clients focused**: Each API client handles one domain
5. **Document public APIs**: Add JSDoc comments for exported functions
6. **Use meaningful names**: Follow existing naming conventions

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for version history and breaking changes.
