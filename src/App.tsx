import React, { FC } from 'react'
import Header from './components/Header.js'
import Home from './pages/Home.js'
import Cart from './pages/Cart.js'
import CartEmpty from './pages/CartEmpty.js'
import { Route, Routes } from 'react-router-dom'

const App: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Cart' element={<Cart />} />
					<Route path='/CartEmpty' element={<CartEmpty />} />
				</Routes>
			</div>
		</div>
	)
}
export default App
