import React, { FC } from 'react'
import cartEmpty from '../assets/img/empty-cart.png'
import { useNavigate } from 'react-router-dom'

const CartEmpty: FC = () => {
	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	return (
		<div className='container'>
			<div className='cart cart--empty'>
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={cartEmpty} alt='Empty cart' />

				<button onClick={goBack} className='button button--black'>
					<span>Вернуться назад</span>
				</button>
			</div>
		</div>
	)
}

export default CartEmpty
