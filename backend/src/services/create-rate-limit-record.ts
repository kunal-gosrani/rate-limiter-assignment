import {
	DEFAULT_RATE_LIMIT_TOKENS,
	RESET_WINDOW_IN_MINUTES,
} from "../constants";
import { db, rateLimitTbl } from "../db";

export async function createRateLimitRecord(id: string) {
	const [newRecord] = await db
		.insert(rateLimitTbl)
		.values({
			id,
			tokensRemaining: DEFAULT_RATE_LIMIT_TOKENS - 1,
			resetAt: new Date(Date.now() + RESET_WINDOW_IN_MINUTES * 60000),
		})
		.returning();

	return newRecord;
}
