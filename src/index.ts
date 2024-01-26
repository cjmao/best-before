import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { zValidator as validate } from '@hono/zod-validator'
import {
	makeFakeItems,
	insertItem,
	insertItemValidator,
	selectItems,
	selectItemsValidator
} from './schema'

type Bindings = {
	DB: D1Database
}

const fakeItems = makeFakeItems(10)

const app = new Hono<{ Bindings: Bindings }>()

app.use('/', serveStatic())
app.use('/assets/*', serveStatic())

const route = app
	.get(
		'/items',
		async c => {
			const items = await selectItems(c.env.DB)

			// Add test data
			if (items.length === 0) {
				items.push(...fakeItems)
			}

			return c.json(items)
		}
	)
	.post(
		'/items',
		validate("json", insertItemValidator),
		async c => {
			const data = c.req.valid("json")
			const item = await insertItem(c.env.DB, data)
			return c.json(item)
		},
		validate("json", selectItemsValidator)
	)

export default app
export type AppType = typeof route
