import { 
    Connection, 
    Keypair, 
    clusterApiUrl, 
    PublicKey 
} from '@solana/web3.js';
import { 
    createMint, 
    getOrCreateAssociatedTokenAccount, 
    mintTo 
} from '@solana/spl-token';
import * as fs from 'fs';
import * as os from 'os';

// Load keypair from default solana config
const keypairPath = `${os.homedir()}/.config/solana/id.json`;
const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(keypairPath, 'utf8')));
const payer = Keypair.fromSecretKey(secretKey);

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function main() {
    console.log(`Wallet address: ${payer.publicKey.toBase58()}`);

    // 1. Create a new SPL Token Mint
    console.log('Creating a new SPL Token Mint...');
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        6 // Decimals
    );
    console.log(`Mint address: ${mint.toBase58()}`);

    // 2. Create an Associated Token Account (ATA) for the wallet
    console.log('Creating Associated Token Account...');
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );
    console.log(`Token Account address: ${tokenAccount.address.toBase58()}`);

    // 3. Mint some tokens to the ATA
    console.log('Minting 1000 tokens to the account...');
    const amountToMint = 1000 * (10 ** 6); // 1000 tokens with 6 decimals
    const signature = await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amountToMint
    );

    console.log(`Success! Transaction signature: ${signature}`);
    console.log(`View on Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

main().catch(console.error);
