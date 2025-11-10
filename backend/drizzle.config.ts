import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";
import { getConfigs } from "./src/configs";

const configs = getConfigs();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: configs.dbHost,
    port: configs.dbPort,
    user: configs.dbUser,
    password: configs.dbPassword,
    database: configs.dbName,
    ssl: false,
  },
}) satisfies Config;
