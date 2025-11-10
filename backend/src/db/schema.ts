import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const rateLimitTbl = pgTable("rate_limits", {
  id: text("id").primaryKey(), // identifier for the user
  tokensRemaining: integer("tokens_remaining").notNull().default(10),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
});

export type RateLimit = typeof rateLimitTbl.$inferSelect;
