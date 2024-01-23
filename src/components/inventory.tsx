import './inventory.css'
import { FC } from 'react'
import { Item } from '../schema'

interface Props {
	items: Item[]
}

export const Inventory: FC<Props> = ({ items }) => {
	return (
		<>
			<h2>Inventory</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Quantity</th>
						<th>Best Before</th>
						<th>Days remaining</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{items.length === 0 ? (
						<tr>
							<td colSpan={5}>No items</td>
						</tr>
					) : items.map(item => {
						const daysLeft = daysRemaining(item)
						return (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td className="numberRow">{item.quantity}</td>
								<td>{item.bestBefore}</td>
								<td>{daysLeft} days</td>
								<td>{status(daysLeft)}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<button>Add Item</button>
		</>
	)
}

function daysRemaining(item: Item) {
	// Using a test date
	const today = new Date("2024-01-20")
	const bestBefore = new Date(item.bestBefore)
	let dt = bestBefore.getTime() - today.getTime()
	dt /= 1000 * 3600 * 24
	return Math.ceil(dt)
}

function status(remainingDays: number): "Fresh" | "Expiring Soon" | "Expired" {
	return remainingDays >= 3 ? "Fresh"
		: remainingDays >= 0 ? "Expiring Soon"
		: "Expired"
}
