import './app.css'
import { AppType } from './index'
import { hc } from 'hono/client'
import { Inventory } from './components/inventory'
import { Item } from './schema'
import { useEffect, useState } from 'react'

const client = hc<AppType>("/")

export function App() {
	const [items, setItems] = useState([] as Item[])

	useEffect(() => {
		let ignore = false

		async function getItems() {
			const response = await client.items.$get()
			const items = await response.json()
			if (!ignore)
				setItems(items)
		}

		getItems()

		return () => {
			ignore = true
		}
	}, [])

	return (
		<>
			<h1>Best Before</h1>
			<Inventory items={items} />
		</>
	)
}
