import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: "src/schema.ts",
	out: "migrations",
	driver: "d1",
	dbCredentials: {
		dbName: "best-before",
		wranglerConfigPath: "wrangler.toml"
	}
})
