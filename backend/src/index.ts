import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getConfigs } from "./configs";
import { migrateDb } from "./db";
import { getRemainingTokens } from "./services/get-remaining-tokens";

const configs = getConfigs();

async function main() {
	await migrateDb();

	const app = new Hono();

	app.use(
		"/*",
		cors({ origin: configs.corsOrigin, allowMethods: ["GET", "OPTIONS"] }),
	);

	app.get("/api/ping", async (c) => {
		const ipAddress = c.req.header("X-Forwarded-For") ?? "";

		const remainingTokens = await getRemainingTokens(ipAddress);

		if (remainingTokens <= 0) {
			return c.json({ allowed: false, remaining: remainingTokens }, 429);
		}

		return c.json({ allowed: true, remaining: remainingTokens });
	});

	serve({ fetch: app.fetch, port: configs.port }, (info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	});
}

main().catch((error) => {
	console.error("Error starting server:", error);
	process.exit(1);
});
