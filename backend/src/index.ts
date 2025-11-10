import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getConfigs } from "./configs";
import { migrateDb } from "./db";

const configs = getConfigs();

async function main() {
  await migrateDb();

  const app = new Hono();

  app.use(
    "/*",
    cors({ origin: configs.corsOrigin, allowMethods: ["GET", "OPTIONS"] })
  );

  app.get("/api/ping", (c) => {
    // TODO: Implement rate limiting logic
    return c.json({ allowed: true, remaining: 10 });
  });

  serve({ fetch: app.fetch, port: configs.port }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  });
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
