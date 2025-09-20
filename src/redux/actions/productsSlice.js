import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await axios.get('./public/db.json')
		return response.data.pizzas
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
		categoryId: null,
		sortIndex: 0,
	},
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
				state.error = action.error.message
			})
	},
})

export const { setCategoryId, setSortIndex } = productsSlice.actions
export default productsSlice.reducer
