# 🚀 Turbin3 Pre-Builder: Week 2 Assignment

<p align="center">
  <img src="nft_image.png" alt="John Wick Turbin3 NFT" width="300" />
</p>

Hey there! Welcome to my submission for the Turbin3 Week 2 Assignment. 

For this week, we were tasked with diving into the Solana ecosystem to mint our own SPL Token and a Metaplex Core NFT from scratch. Rather than relying on outdated boilerplate, I decided to build these scripts from the ground up using modern tools like the **Metaplex Umi framework** and the **Irys Uploader** for decentralized storage.

Here is a breakdown of what I built and the on-chain proof that everything works!

---

## 🏆 Submission Proof (Devnet)

I've successfully executed both scripts on the Solana Devnet. You can verify the on-chain data using the links below:

### 1. The SPL Token
- **Mint Address**: `38ZZ2iTtt9tgWJHTLZaB3MguWoefMQsQPA6oEoUUswmN`
- **Transaction Hash**: [View on Solana Explorer](https://explorer.solana.com/tx/62AuyY1TZdgXMQYtiHqqyhyi38c8L7sCEkGc6a2WYzL75FYTxgH9aCZCTH9fZJCdCbJVKgFEo4Nmhje9QbLP2nZ6?cluster=devnet)

### 2. The Metaplex Core NFT (John Wick Edition)
For the NFT, I uploaded a custom John Wick image to Arweave using Irys and attached an on-chain `Attributes` plugin!
- **Asset ID**: `35nFbb3VYoAtzRqjup6sHFZfmYk3UQNQvQN7yiD9XBUT`
- **Metaplex Explorer**: [View the NFT details here](https://core.metaplex.com/explorer/35nFbb3VYoAtzRqjup6sHFZfmYk3UQNQvQN7yiD9XBUT?env=devnet)
- **Arweave Image**: [View Raw Image](https://devnet.irys.xyz/HkpoEtymhfLFwSesXTnTwZpgP5v3yVzTEzveKrA1W6P9)

---

## 🛠️ How It Was Built

I split the assignment into two clean, easy-to-read TypeScript files located in the `src/` directory.

### SPL Token Minting (`src/mint_spl.ts`)
This script uses `@solana/web3.js` and `@solana/spl-token`. When run, it connects to Devnet, creates a brand new token mint, spins up an Associated Token Account (ATA) for my wallet, and mints 1,000 tokens into it. Simple and effective!

### Metaplex Core NFT (`src/mint_nft_core.ts`)
This is where the heavy lifting happens. Instead of using the older Metaplex SDKs, I used **Umi** and `@metaplex-foundation/mpl-core`. 
1. It reads a local image (`nft_image.png`).
2. It uses the `@metaplex-foundation/umi-uploader-irys` plugin to push the image and metadata to decentralized storage.
3. It mints the NFT and utilizes the **Attributes Core Plugin** to bake custom traits (like `Course: Turbin3`) directly into the asset on-chain.

---

## 💻 Running it Yourself

If you want to clone this and run it yourself, you'll need Node.js and a valid Solana keypair with some Devnet SOL at `~/.config/solana/id.json`.

1. **Install the dependencies:**
   ```bash
   npm install
   ```

2. **Mint the SPL Token:**
   ```bash
   npm run mint-spl
   ```

3. **Mint the Core NFT:**
   *(Make sure you drop an image named `nft_image.png` in the root folder first!)*
   ```bash
   npm run mint-nft
   ```

---
*"I have served. I will be of service."*
