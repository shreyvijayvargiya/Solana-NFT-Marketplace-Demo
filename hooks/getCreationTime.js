import { Connection, clusterApiUrl } from "@solana/web3.js";

export const getCreationTime = async (slotNumber) => {
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
	const creationTime = await connection.getBlockTime(slotNumber);
	return creationTime;
};
