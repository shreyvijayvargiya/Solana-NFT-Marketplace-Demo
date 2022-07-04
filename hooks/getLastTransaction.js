import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getCreationTime } from './getCreationTime';

export const getLastTransaction = async (tokenAddress) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const transactions = await connection.getSignaturesForAddress(
    new PublicKey(tokenAddress)
  );
  const latestTransactionBlockTime = transactions[0].blockTime;
  const slotNumber = transactions[transactions.length - 1].slot;
  const creatonTime = await getCreationTime(slotNumber);
  return { latestTransactionBlockTime, creatonTime  };
};
