import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const getUserNFTFromAddress = async (walletAddress) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const userNFTs = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );
  return userNFTs;
};
