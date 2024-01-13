import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const itemsTable = sqliteTable("items", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	quantity: integer("quantity").notNull(),
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
	bestBefore: integer("bestBefore", { mode: "timestamp" }).notNull(),
}, table => ({
	nameIndex: index("nameIndex").on(table.name)
}))
