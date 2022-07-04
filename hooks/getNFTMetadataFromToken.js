import * as metadata from '@metaplex-foundation/mpl-token-metadata';
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const getNFTMetadataFromToken = async(tokenAddress) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const data = await metadata.Metadata.findByMint(
        connection,
        tokenAddress
    );
    return data;
}