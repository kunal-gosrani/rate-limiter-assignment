CREATE TABLE "rate_limits" (
	"id" text PRIMARY KEY NOT NULL,
	"tokens_remaining" integer DEFAULT 10 NOT NULL,
	"reset_at" timestamp with time zone NOT NULL
);
