import './inventory.css'
import { FC } from 'react'
import { Item } from '../schema'

interface Props {
	items: Item[]
}

export const Inventory: FC<Props> = ({ items }) => {
	return (
		<div id="inventory">
			<div id="inventory-header">
				<h2>Inventory</h2>
				<button>Add Item</button>
			</div>
			<div id="inventory-body">
				<table>
					<thead>
						<tr className="table-header-row">
							<th>Name</th>
							<th>Quantity</th>
							<th>Best Before</th>
							<th>Days remaining</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{items.length === 0 ? (
							<tr className="table-body-row">
								<td colSpan={5}>No items</td>
							</tr>
						) : items.map(item => {
							const daysLeft = daysRemaining(item)
							return (
								<tr className="table-body-row" key={item.id}>
									<td>{item.name}</td>
									<td className="col-quantity">{item.quantity}</td>
									<td className="text-date">{item.bestBefore}</td>
									<td>{daysLeft} days</td>
									<td>{status(daysLeft)}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function daysRemaining(item: Item) {
	const today = new Date(Date.now())
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
