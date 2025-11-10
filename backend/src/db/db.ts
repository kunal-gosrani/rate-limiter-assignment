import { drizzle } from "drizzle-orm/node-postgres";
import { getConfigs } from "../configs";
import * as schema from "./schema";

const configs = getConfigs();

export const db = drizzle({
	schema,
	connection: {
		host: configs.dbHost,
		port: configs.dbPort,
		user: configs.dbUser,
		password: configs.dbPassword,
		database: configs.dbName,
		ssl: false,
	},
});
