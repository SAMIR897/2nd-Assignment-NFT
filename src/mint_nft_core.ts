import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { 
    createSignerFromKeypair, 
    generateSigner, 
    keypairIdentity, 
    createGenericFile
} from '@metaplex-foundation/umi';
import { create, mplCore } from '@metaplex-foundation/mpl-core';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Grab our wallet keypair from the local Solana CLI setup
const keypairPath = `${os.homedir()}/.config/solana/id.json`;
const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(keypairPath, 'utf8')));

// Fire up the Umi framework and point it at the Devnet
const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
    .use(irysUploader({ address: "https://devnet.irys.xyz" })); // Use devnet irys

const myKeypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
const myKeypairSigner = createSignerFromKeypair(umi, myKeypair);

// Tell Umi to use our wallet for signing transactions
umi.use(keypairIdentity(myKeypairSigner));

async function main() {
    console.log(`Wallet address: ${myKeypair.publicKey}`);

    // Step 1: Upload the raw image file to Irys (Arweave)
    console.log('Uploading Image to Irys...');
    const imageFile = fs.readFileSync(path.join(__dirname, '../nft_image.png'));
    const umiImageFile = createGenericFile(imageFile, 'nft_image.png', {
        tags: [{ name: 'Content-Type', value: 'image/png' }],
    });

    // Push the file up to the decentralized storage
    const imageUriRaw = await umi.uploader.upload([umiImageFile]);
    const imageUri = imageUriRaw[0].replace("arweave.net", "devnet.irys.xyz");
    console.log(`Image uploaded successfully: ${imageUri}`);

    // Step 2: Create and upload the metadata JSON
    console.log('Uploading Metadata...');
    const metadata = {
        name: 'John Wick Turbin3 NFT',
        description: 'An exclusive Core NFT for Turbin3 Week 2',
        image: imageUri,
        attributes: [
            { trait_type: 'Course', value: 'Turbin3' },
            { trait_type: 'Week', value: '2' },
            { trait_type: 'Status', value: 'Completed' },
            { trait_type: 'Character', value: 'John Wick' }
        ],
        properties: {
            files: [
                {
                    type: "image/png",
                    uri: imageUri
                }
            ]
        }
    };

    const metadataUriRaw = await umi.uploader.uploadJson(metadata);
    const metadataUri = metadataUriRaw.replace("arweave.net", "devnet.irys.xyz");
    console.log(`Metadata uploaded successfully: ${metadataUri}`);

    // Step 3: Let's mint this beautiful Core NFT!
    console.log('Minting the Core NFT...');
    const assetSigner = generateSigner(umi);
    const tx = await create(umi, {
        asset: assetSigner,
        name: 'John Wick Turbin3 NFT',
        uri: metadataUri,
        plugins: [
            {
                type: 'Attributes',
                attributeList: metadata.attributes.map(attr => ({
                    key: attr.trait_type,
                    value: attr.value
                }))
            }
        ]
    }).sendAndConfirm(umi);

    console.log(`Asset minted successfully!`);
    console.log(`Asset Address: ${assetSigner.publicKey}`);
    console.log(`View your NFT at: https://core.metaplex.com/explorer/${assetSigner.publicKey}?env=devnet`);
}

main().catch(console.error);
