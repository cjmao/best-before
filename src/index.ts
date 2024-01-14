import { createInsertSchema } from 'drizzle-zod'
import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { itemsTable } from './schema'
import { zValidator } from '@hono/zod-validator'
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

app.get('/', async (c) => {
	const items = await c.get("db").select().from(itemsTable).all()
	return c.json(items)
})

app.post('/', zValidator("json", createInsertSchema(itemsTable)), async (c) => {
	try {
		const data = await c.req.json()
		const item = await c.get("db").insert(itemsTable).values(data).returning()
		return c.json(item)
	} catch (error) {
		console.error(error)
		return c.json({ error })
	}
})

export default app
