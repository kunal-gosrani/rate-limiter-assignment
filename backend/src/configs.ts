/**
 * Load config values from environment variables with fallback defaults
 */

import { configDotenv } from "dotenv";

configDotenv();

const configs = {
  port: Number(process.env.PORT) || 4000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  dbName: process.env.DB_NAME || "rate-limiter",
};

export function getConfigs() {
  return configs;
}
