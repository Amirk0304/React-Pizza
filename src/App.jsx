import React from 'react'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import CartEmpty from './pages/CartEmpty.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />} exact />
					<Route path='/Cart' element={<Cart />} />
					<Route path='/CartEmpty' element={<CartEmpty />} />
				</Routes>
			</div>
		</div>
	)
}
export default App
