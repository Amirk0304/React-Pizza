import React, { FC } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
const logo = new URL('../assets/img/pizza-logo.svg', import.meta.url).href

const Header: FC = () => {
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
