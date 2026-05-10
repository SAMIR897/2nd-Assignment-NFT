# Turbin3 Week 2 Assignment

This repository contains scripts to mint an SPL Token and a Metaplex Core NFT using the new Umi framework. 

## Requirements

- Node.js installed
- A valid Solana keypair file located at `~/.config/solana/id.json` with some Devnet SOL.

## Setup

1. Clone the repository and navigate to this directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Scripts

### 1. Mint an SPL Token

This script will connect to Solana Devnet, create a new Token Mint, create an Associated Token Account (ATA) for your wallet, and mint 1,000 tokens to it.

```bash
npm run mint-spl
```

### 2. Mint a Metaplex Core NFT

This script uses the `@metaplex-foundation/mpl-core` library alongside the Umi framework to mint a new Core NFT. It also utilizes the `Attributes` Core Plugin to attach custom traits (e.g., `Course: Turbin3`, `Week: 2`) directly to the asset.

```bash
npm run mint-nft
```

## Details

- **SPL Token Minting**: Uses `@solana/spl-token` and `@solana/web3.js` to create the mint and ATA.
- **MPL Core NFT**: Uses `@metaplex-foundation/umi` and `@metaplex-foundation/mpl-core`. The `Attributes` plugin is passed during the `create` instruction to assign on-chain traits to the NFT.
