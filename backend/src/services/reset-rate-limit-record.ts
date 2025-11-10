import { eq } from "drizzle-orm";
import {
	DEFAULT_RATE_LIMIT_TOKENS,
	RESET_WINDOW_IN_MINUTES,
} from "../constants";
import { db, rateLimitTbl } from "../db";

export async function resetRateLimitRecord(id: string) {
	const [updatedRecord] = await db
		.update(rateLimitTbl)
		.set({
			tokensRemaining: DEFAULT_RATE_LIMIT_TOKENS - 1,
			resetAt: new Date(Date.now() + RESET_WINDOW_IN_MINUTES * 60000),
		})
		.where(eq(rateLimitTbl.id, id))
		.returning();

	return updatedRecord;
}
