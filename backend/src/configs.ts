/**
 * We have hard coded the config values here for now.
 * We will load the values from the .env file in the real project.
 */

const configs = {
	port: 4000,
	corsOrigin: "http://localhost:3000",
	dbHost: "localhost",
	dbPort: 5432,
	dbUser: "postgres",
	dbPassword: "postgres",
	dbName: "rate-limiter",
};

export function getConfigs() {
	return configs;
}
