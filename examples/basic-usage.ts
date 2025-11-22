import { LighterClient } from '../src';

async function basicUsage(): Promise<void> {
  const client = new LighterClient({
    network: 'mainnet',
  });

  console.log('Fetching system status...');
  const status = await client.root.getStatus();
  console.log('Status:', status);

  console.log('\nFetching order books...');
  const orderBooks = await client.order.getOrderBooks();
  console.log('Available markets:', orderBooks.order_books.length);

  if (orderBooks.order_books.length > 0) {
    const firstMarket = orderBooks.order_books[0];
    console.log('\nFirst market:', firstMarket.symbol);

    console.log('\nFetching order book details...');
    const orderBookDetails = await client.order.getOrderBookDetails({
      market_id: firstMarket.market_id,
      depth: 5,
    });

    console.log('Best bid:', orderBookDetails.bids[0]);
    console.log('Best ask:', orderBookDetails.asks[0]);
    console.log('Last price:', orderBookDetails.last_price);

    console.log('\nFetching recent trades...');
    const recentTrades = await client.order.getRecentTrades({
      market_id: firstMarket.market_id,
      limit: 5,
    });
    console.log('Recent trades:', recentTrades.trades.length);

    console.log('\nFetching candlestick data...');
    const candlesticks = await client.market.getCandlesticks({
      market_id: firstMarket.market_id,
      interval: '1h',
      limit: 10,
    });
    console.log('Candlesticks:', candlesticks.candlesticks.length);
  }

  console.log('\nFetching funding rates...');
  const fundingRates = await client.market.getFundingRates();
  console.log('Funding rates for markets:', fundingRates.funding_rates.length);

  console.log('\nFetching explorer stats...');
  const stats = await client.explorer.getStats({ period: '24h' });
  console.log('Total accounts:', stats.total_accounts);
  console.log('Total volume:', stats.total_volume);
  console.log('Total trades:', stats.total_trades);
}

basicUsage().catch(console.error);
