import { SignerClient } from '../src';

async function signerUsage(): Promise<void> {
  const privateKey = process.env.PRIVATE_KEY;
  const accountIndex = parseInt(process.env.ACCOUNT_INDEX || '1');

  if (!privateKey) {
    console.error('Please set PRIVATE_KEY environment variable');
    process.exit(1);
  }

  const signer = new SignerClient({
    baseURL: 'https://mainnet.zklighter.elliot.ai',
    privateKey,
    accountIndex,
  });

  console.log('Wallet address:', signer.getAddress());
  console.log('Account index:', signer.getAccountIndex());

  console.log('\nSyncing nonce...');
  const nonce = await signer.syncNonce();
  console.log('Current nonce:', nonce);

  console.log('\nCreating a limit order...');
  try {
    const order = await signer.createOrder({
      market_id: 1,
      side: 'buy',
      type: 'limit',
      time_in_force: 'gtc',
      price: '45000',
      size: '0.001',
    });
    console.log('Order created:', order.tx_hash);
    console.log('Status:', order.status);
  } catch (error) {
    console.error('Failed to create order:', error);
  }

  console.log('\nSigning a message...');
  const message = 'Hello, Lighter!';
  const signature = await signer.signMessage(message);
  console.log('Message:', message);
  console.log('Signature:', signature);
}

signerUsage().catch(console.error);
