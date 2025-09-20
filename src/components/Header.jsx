import React from 'react'
import Button from './Button.jsx'
import { Link } from 'react-router-dom'
import logo from '../assets/img/pizza-logo.svg'

function Header() {
	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					{' '}
					<div className='header__logo'>
						<img width='38' src={logo} alt='Pizza logo' />

						<div>
							<h1>React Pizza</h1>
							<p>Самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>
				<a className='header__cart'>
					<Button />
				</a>
			</div>
		</div>
	)
}

export default Header
