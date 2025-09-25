import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

type CartStoredItem = {
	id: number
	name?: string
	price: number
	imageUrl?: string
	type: number
	size: number
	count: number
}

type CartState = {
	itemsByKey: Record<string, CartStoredItem>
	totalCount: number
	totalPrice: number
}

const makeItemKey = (item: Omit<CartStoredItem, 'count'>): string => {
	return `${item.id}__t${item.type}__s${item.size}`
}

const initialState: CartState = {
	itemsByKey: {}, // key -> { id, name, price, imageUrl, type, size, count }
	totalCount: 0,
	totalPrice: 0,
}

const recomputeTotals = (state: CartState): void => {
	let totalCount = 0
	let totalPrice = 0
	Object.values(state.itemsByKey).forEach((cartItem: CartStoredItem) => {
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

type makeItemKeyFromOptionsTypes = (
	id: number,
	type: number,
	size: number
) => string

export const { addItem, incrementItem, decrementItem, removeItem, clearCart } =
	cartSlice.actions

export const selectCartTotals = createSelector(
	state => state.cart.totalCount,
	state => state.cart.totalPrice,
	(totalCount, totalPrice) => ({ totalCount, totalPrice })
)

export const selectCartItems = createSelector(
	state => state.cart.itemsByKey,
	(itemsByKey: CartState['itemsByKey']) =>
		Object.entries(itemsByKey).map(([key, value]) => ({
			key,
			...(value as CartStoredItem),
		}))
)

export const makeSelectCountByPizzaId =
	(id: number) => (state: { cart: CartState }) =>
		Object.values(state.cart.itemsByKey).reduce(
			(sum: number, it: CartStoredItem) =>
				it.id === id ? sum + it.count : sum,
			0
		)

export const makeItemKeyFromOptions: makeItemKeyFromOptionsTypes = (
	id,
	type,
	size
) => `${id}__t${type}__s${size}`

export default cartSlice.reducer
