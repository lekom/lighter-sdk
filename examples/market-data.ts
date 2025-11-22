import { LighterClient } from '../src';

async function fetchMarketData(): Promise<void> {
  const client = new LighterClient({
    network: 'mainnet',
  });

  console.log('Fetching all markets...\n');
  const markets = await client.explorer.getMarkets();

  console.log(`Found ${markets.markets.length} markets\n`);

  for (const market of markets.markets.slice(0, 3)) {
    console.log(`\n========== ${market.symbol} ==========`);
    console.log('Market ID:', market.market_id);
    console.log('Base Token:', market.base_token);
    console.log('Quote Token:', market.quote_token);
    console.log('Current Price:', market.current_price);
    console.log('24h Volume:', market.volume_24h);
    console.log('24h High:', market.high_24h);
    console.log('24h Low:', market.low_24h);
    console.log('24h Change:', market.price_change_24h);
    console.log('24h Trades:', market.num_trades_24h);
    if (market.open_interest) {
      console.log('Open Interest:', market.open_interest);
    }

    console.log('\nOrder Book:');
    const orderBook = await client.order.getOrderBookDetails({
      market_id: market.market_id,
      depth: 5,
    });

    console.log('\nTop 5 Bids:');
    orderBook.bids.slice(0, 5).forEach((bid, i) => {
      console.log(`  ${i + 1}. Price: ${bid.price}, Size: ${bid.size}`);
    });

    console.log('\nTop 5 Asks:');
    orderBook.asks.slice(0, 5).forEach((ask, i) => {
      console.log(`  ${i + 1}. Price: ${ask.price}, Size: ${ask.size}`);
    });

    console.log('\nRecent Trades:');
    const trades = await client.order.getRecentTrades({
      market_id: market.market_id,
      limit: 5,
    });

    trades.trades.forEach((trade, i) => {
      const time = new Date(trade.timestamp).toLocaleTimeString();
      console.log(`  ${i + 1}. ${time} - ${trade.side} ${trade.size} @ ${trade.price}`);
    });

    console.log('\nCandlestick Data (1h):');
    const candlesticks = await client.market.getCandlesticks({
      market_id: market.market_id,
      interval: '1h',
      limit: 5,
    });

    candlesticks.candlesticks.forEach((candle, i) => {
      const time = new Date(candle.timestamp).toLocaleTimeString();
      console.log(`  ${i + 1}. ${time}`);
      console.log(`     O: ${candle.open}, H: ${candle.high}, L: ${candle.low}, C: ${candle.close}, V: ${candle.volume}`);
    });
  }

  console.log('\n\n========== Funding Rates ==========');
  const fundingRates = await client.market.getFundingRates();

  fundingRates.funding_rates.forEach((rate) => {
    console.log(`\n${rate.market_symbol}:`);
    console.log('  Current Rate:', rate.current_funding_rate);
    console.log('  Predicted Rate:', rate.predicted_funding_rate);
    console.log('  Index Price:', rate.index_price);
    console.log('  Mark Price:', rate.mark_price);
    console.log('  Next Funding:', new Date(rate.next_funding_time).toLocaleString());
  });

  console.log('\n\n========== Exchange Stats ==========');
  const stats = await client.explorer.getStats({ period: '24h' });
  console.log('Total Accounts:', stats.total_accounts);
  console.log('Active Accounts:', stats.active_accounts);
  console.log('New Accounts:', stats.new_accounts);
  console.log('Total Volume:', stats.total_volume);
  console.log('Total Trades:', stats.total_trades);
  console.log('Total Transactions:', stats.total_transactions);
  console.log('Total Blocks:', stats.total_blocks);
  console.log('Avg Block Time:', stats.average_block_time, 'seconds');
}

fetchMarketData().catch(console.error);
