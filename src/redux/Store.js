// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './actions/productsSlice'
import cartReducer from './reducer/Cart'

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
	},
})

export default store
