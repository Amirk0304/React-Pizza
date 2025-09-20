import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.jsx'
import CartSkeleton from '../components/PizzaBlock/CartSkeleton.jsx'
import {
	fetchProducts,
	setCategoryId,
	setSortIndex,
} from '../redux/actions/productsSlice.js'

function Home() {
	const dispatch = useDispatch()
	const { items, status, categoryId, sortIndex } = useSelector(
		state => state.products
	)
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts())
		}
	}, [dispatch, status])

	const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
	const sortItems = ['Популярности', 'Цене', 'Алфавиту']

	const filteredItems = useMemo(() => {
		const byCategory =
			categoryId === null ? items : items.filter(p => p.category === categoryId)
		const sorted = [...byCategory]
		if (sortIndex === 0) {
			// Популярности (по rating desc)
			sorted.sort((a, b) => b.rating - a.rating)
		} else if (sortIndex === 1) {
			// Цене (asc)
			sorted.sort((a, b) => a.price - b.price)
		} else if (sortIndex === 2) {
			// Алфавиту (name asc, locale)
			sorted.sort((a, b) => a.name.localeCompare(b.name))
		}
		return sorted
	}, [items, categoryId, sortIndex])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					items={categories}
					activeIndex={categoryId}
					onSelect={idx => dispatch(setCategoryId(idx))}
				/>
				<Sort
					items={sortItems}
					activeIndex={sortIndex}
					onSelect={idx => dispatch(setSortIndex(idx))}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'loading' || status === 'idle'
					? [...new Array(6)].map((_, index) => <CartSkeleton key={index} />)
					: filteredItems.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
				<svg>
					<circle strokeWidth='2' />
				</svg>
			</div>
		</div>
	)
}

export default Home
