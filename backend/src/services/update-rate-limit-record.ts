import { eq } from "drizzle-orm";
import { db, rateLimitTbl } from "../db";

export async function updateRateLimitRecord(
	id: string,
	tokensRemaining: number,
) {
	const [updatedRecord] = await db
		.update(rateLimitTbl)
		.set({ tokensRemaining })
		.where(eq(rateLimitTbl.id, id))
		.returning();

	return updatedRecord;
}
