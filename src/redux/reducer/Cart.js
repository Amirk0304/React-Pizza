import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

// Cart item identity: same pizza id + type index + size value are merged
function makeItemKey(item) {
	return `${item.id}__t${item.type}__s${item.size}`
}

const initialState = {
	itemsByKey: {}, // key -> { id, name, price, imageUrl, type, size, count }
	totalCount: 0,
	totalPrice: 0,
}

function recomputeTotals(state) {
	let totalCount = 0
	let totalPrice = 0
	Object.values(state.itemsByKey).forEach(cartItem => {
		totalCount += cartItem.count
		totalPrice += cartItem.count * cartItem.price
	})
	state.totalCount = totalCount
	state.totalPrice = totalPrice
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const item = action.payload // { id, name, price, imageUrl, type, size }
			const key = makeItemKey(item)
			const existing = state.itemsByKey[key]
			if (existing) {
				existing.count += 1
			} else {
				state.itemsByKey[key] = { ...item, count: 1 }
			}
			recomputeTotals(state)
		},
		incrementItem: (state, action) => {
			const key = action.payload // key string
			const existing = state.itemsByKey[key]
			if (existing) {
				existing.count += 1
				recomputeTotals(state)
			}
		},
		decrementItem: (state, action) => {
			const key = action.payload
			const existing = state.itemsByKey[key]
			if (existing) {
				existing.count = Math.max(0, existing.count - 1)
				if (existing.count === 0) {
					delete state.itemsByKey[key]
				}
				recomputeTotals(state)
			}
		},
		removeItem: (state, action) => {
			const key = action.payload
			if (state.itemsByKey[key]) {
				delete state.itemsByKey[key]
				recomputeTotals(state)
			}
		},
		clearCart: state => {
			state.itemsByKey = {}
			recomputeTotals(state)
		},
	},
})

export const { addItem, incrementItem, decrementItem, removeItem, clearCart } =
	cartSlice.actions

export const selectCartTotals = createSelector(
	state => state.cart.totalCount,
	state => state.cart.totalPrice,
	(totalCount, totalPrice) => ({ totalCount, totalPrice })
)

export const selectCartItems = createSelector(
	state => state.cart.itemsByKey,
	itemsByKey =>
		Object.entries(itemsByKey).map(([key, value]) => ({ key, ...value }))
)

export const makeSelectCountByPizzaId = id => state =>
	Object.values(state.cart.itemsByKey).reduce(
		(sum, it) => (it.id === id ? sum + it.count : sum),
		0
	)

export const makeItemKeyFromOptions = (id, type, size) =>
	`${id}__t${type}__s${size}`

export default cartSlice.reducer
