import { eq } from "drizzle-orm";
import { db, rateLimitTbl } from "../db";
import { createRateLimitRecord } from "./create-rate-limit-record";
import { resetRateLimitRecord } from "./reset-rate-limit-record";
import { updateRateLimitRecord } from "./update-rate-limit-record";

export async function getRemainingTokens(id: string) {
	const record = await db.query.rateLimitTbl.findFirst({
		where: eq(rateLimitTbl.id, id),
	});

	if (!record) {
		const newRecord = await createRateLimitRecord(id);
		return newRecord.tokensRemaining;
	}

	const toResetLimits = record.resetAt.getTime() < Date.now();
	if (toResetLimits) {
		const updatedRecord = await resetRateLimitRecord(id);
		return updatedRecord.tokensRemaining;
	}

	const isLimitReached = record.tokensRemaining <= 0;
	if (isLimitReached) {
		return 0;
	}

	const updatedRecord = await updateRateLimitRecord(
		id,
		record.tokensRemaining - 1,
	);

	return updatedRecord.tokensRemaining;
}
