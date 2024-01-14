import { Hono } from 'hono'
import { zValidator as validate } from '@hono/zod-validator'
import {
	insertItem,
	insertItemValidator,
	selectItems,
	selectItemsValidator
} from './schema'

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async c => {
	const items = await selectItems(c.env.DB)
	return c.json(items)
}, validate("json", selectItemsValidator))

app.post(
	'/',
	validate("json", insertItemValidator),
	async c => {
		const data = c.req.valid("json")
		const item = await insertItem(c.env.DB, data)
		return c.json(item)
	},
	validate("json", selectItemsValidator)
)

export default app
