import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { insertItemValidator, itemsTable, selectItemsValidator } from './schema'
import { zValidator as validate } from '@hono/zod-validator'
import type { DrizzleD1Database } from 'drizzle-orm/d1'

type Bindings = {
	DB: D1Database
}

type Variables = {
	db: DrizzleD1Database
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()

app.use("*", async (c, next) => {
	c.set("db", drizzle(c.env.DB))
	await next()
})

app.get('/', async c => {
	const items = await c.get("db").select().from(itemsTable).all()
	return c.json(items)
}, validate("json", selectItemsValidator))

app.post(
	'/',
	validate("json", insertItemValidator),
	async c => {
		const data = c.req.valid("json")
		const item = await c.get("db").insert(itemsTable).values(data).returning()
		return c.json(item)
	},
	validate("json", selectItemsValidator)
)

export default app
