import { LighterClient } from '../src';

async function monitorAccount(accountIndex: number): Promise<void> {
  const client = new LighterClient({
    network: 'mainnet',
  });

  console.log(`Monitoring account ${accountIndex}...\n`);

  console.log('Fetching account details...');
  const account = await client.account.getAccount({ account_index: accountIndex });
  console.log('Status:', account.status === 1 ? 'Active' : 'Inactive');
  console.log('L1 Address:', account.l1_address);
  console.log('Collateral:', account.collateral);

  if (account.positions.length > 0) {
    console.log('\nPositions:');
    account.positions.forEach((position) => {
      console.log(`  Market ${position.market_id}:`);
      console.log(`    Direction: ${position.direction === 1 ? 'Long' : position.direction === -1 ? 'Short' : 'None'}`);
      console.log(`    Size: ${position.size}`);
      console.log(`    Entry Price: ${position.average_entry_price}`);
      console.log(`    Unrealized PnL: ${position.unrealized_pnl}`);
      console.log(`    Realized PnL: ${position.realized_pnl}`);
      console.log(`    Open Orders: ${position.open_order_count}`);
    });
  } else {
    console.log('\nNo open positions');
  }

  console.log('\nFetching PnL...');
  const pnl = await client.account.getPnL({ account_index: accountIndex });
  console.log('Total PnL:', pnl.total_pnl);
  console.log('Realized PnL:', pnl.realized_pnl);
  console.log('Unrealized PnL:', pnl.unrealized_pnl);

  console.log('\nFetching active orders...');
  const activeOrders = await client.order.getAccountActiveOrders({
    account_index: accountIndex,
  });
  console.log('Active orders:', activeOrders.total);

  if (activeOrders.orders.length > 0) {
    console.log('\nOrder details:');
    activeOrders.orders.forEach((order) => {
      console.log(`  Order ${order.order_id}:`);
      console.log(`    Market: ${order.market_id}`);
      console.log(`    Side: ${order.side}`);
      console.log(`    Type: ${order.type}`);
      console.log(`    Price: ${order.price}`);
      console.log(`    Size: ${order.size}`);
      console.log(`    Filled: ${order.filled_size}`);
      console.log(`    Status: ${order.status}`);
    });
  }

  console.log('\nFetching account limits...');
  const limits = await client.account.getAccountLimits({ account_index: accountIndex });
  console.log('Max Leverage:', limits.max_leverage);
  console.log('Max Position Size:', limits.max_position_size);
  console.log('Max Order Size:', limits.max_order_size);
  console.log('Tier:', limits.tier);

  console.log('\nFetching recent transactions...');
  const transactions = await client.transaction.getTransactions({
    account_index: accountIndex,
    limit: 5,
  });
  console.log('Recent transactions:', transactions.total);

  if (transactions.transactions.length > 0) {
    console.log('\nTransaction details:');
    transactions.transactions.forEach((tx) => {
      console.log(`  ${tx.tx_hash}:`);
      console.log(`    Type: ${tx.tx_type}`);
      console.log(`    Status: ${tx.status}`);
      console.log(`    Block: ${tx.block_number}`);
      console.log(`    Timestamp: ${new Date(tx.timestamp).toISOString()}`);
    });
  }
}

const accountIndex = parseInt(process.argv[2] || '1');
monitorAccount(accountIndex).catch(console.error);
