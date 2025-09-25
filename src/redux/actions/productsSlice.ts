import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from './Types.ts'

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await axios.get('./public/db.json')
		return response.data.pizzas
	}
)

interface ProductsState {
	items: Product[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	categoryId: number | null
	sortIndex: number
}
const initialState: ProductsState = {
	items: [],
	status: 'idle',
	error: null,
	categoryId: null,
	sortIndex: 0,
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload
		},
		setSortIndex: (state, action) => {
			state.sortIndex = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ?? null
			})
	},
})

export const { setCategoryId, setSortIndex } = productsSlice.actions
export default productsSlice.reducer
