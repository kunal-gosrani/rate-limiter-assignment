import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getConfigs } from "./configs";

const app = new Hono();

const configs = getConfigs();

app.use(
	"/*",
	cors({ origin: configs.corsOrigin, allowMethods: ["GET", "OPTIONS"] }),
);

app.get("/api/ping", (c) => {
	// TODO: Implement rate limiting logic
	return c.json({ allowed: true, remaining: 10 });
});

serve({ fetch: app.fetch, port: configs.port }, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});
