import { drizzle } from 'drizzle-orm/d1'
import { sql } from 'drizzle-orm'
import {
	createInsertSchema,
	createSelectSchema
} from 'drizzle-zod'
import {
	index,
	integer,
	sqliteTable,
	text
} from 'drizzle-orm/sqlite-core'

export const items = sqliteTable("items", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	quantity: integer("quantity").notNull(),
	createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
	bestBefore: text("bestBefore").notNull(),
}, table => ({
	nameIndex: index("nameIndex").on(table.name)
}))

export type Item = typeof items.$inferSelect
type ItemToBeInserted = typeof items.$inferInsert

export const selectItemsValidator = createSelectSchema(items, {
	name: s => s.name.min(1),
	quantity: s => s.quantity.positive().int()
})

export const insertItemValidator = createInsertSchema(items, {
	name: s => s.name.min(1),
	quantity: s => s.quantity.positive().int()
})

export async function selectItems(db: D1Database): Promise<Item[]> {
	return await drizzle(db).select().from(items).all()
}

export async function insertItem(db: D1Database, item: ItemToBeInserted): Promise<Item> {
	const result = await drizzle(db).insert(items).values(item).returning()
	return result[0]
}
